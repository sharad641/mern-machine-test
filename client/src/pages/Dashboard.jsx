import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import AgentForm from '../components/AgentForm.jsx'
import AgentList from '../components/AgentList.jsx'
import UploadForm from '../components/UploadForm.jsx'
import AssignmentsTable from '../components/AssignmentsTable.jsx'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [agents, setAgents] = useState([])
  const [contacts, setContacts] = useState([])
  const [batchId, setBatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const isAdmin = user?.role === 'admin'

  const fetchAgents = async () => {
    try {
      const { data } = await api.get('/api/agents')
      setAgents(data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchContacts = async (params={}) => {
    try {
      setLoading(true)
      const query = new URLSearchParams(params).toString()
      const { data } = await api.get('/api/contacts' + (query ? `?${query}` : ''))
      setContacts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (isAdmin) { fetchAgents(); fetchContacts(); } }, [])

  const grouped = useMemo(() => {
    const map = {}
    for (const a of agents) map[a._id] = { agent: a, items: [] }
    for (const c of contacts) {
      const id = c.assignedTo?._id || c.assignedTo
      if (!map[id]) map[id] = { agent: { _id: id, name: '(Unknown)'}, items: [] }
      map[id].items.push(c)
    }
    return Object.values(map)
  }, [agents, contacts])

  if (!isAdmin) {
    return (
      <div style={{padding:20}}>
        <h2>Agent View</h2>
        <p>You are logged in as an agent. Please use the mobile app or ask admin to share your contacts list (this demo dashboard is admin-focused).</p>
        <button onClick={logout} style={{marginTop:8}}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{padding:20, fontFamily:'Inter, system-ui, sans-serif', maxWidth:1100, margin:'0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Admin Dashboard</h2>
        <div>
          <span style={{marginRight:12, opacity:0.7}}>{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:20}}>
        <div style={{border:'1px solid #eee', borderRadius:12, padding:16}}>
          <h3>Add Agent</h3>
          <AgentForm onCreated={fetchAgents} />
        </div>
        <div style={{border:'1px solid #eee', borderRadius:12, padding:16}}>
          <h3>Agents</h3>
          <AgentList agents={agents} />
        </div>
      </section>

      <section style={{border:'1px solid #eee', borderRadius:12, padding:16, marginTop:20}}>
        <h3>Upload & Distribute</h3>
        <UploadForm onDone={(info) => { setBatchId(info.batchId); fetchContacts({ batchId: info.batchId}); }} />
        {batchId && <div style={{marginTop:8, fontSize:12}}>Last Batch: <b>{batchId}</b></div>}
      </section>

      <section style={{border:'1px solid #eee', borderRadius:12, padding:16, marginTop:20}}>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <h3 style={{margin:0}}>Distributed Lists</h3>
          <button onClick={()=>fetchContacts({})} disabled={loading} style={{marginLeft:'auto'}}>Refresh</button>
        </div>
        <AssignmentsTable grouped={grouped} loading={loading} />
      </section>
    </div>
  )
}
