import { useState } from 'react'
import api from '../api/axios.js'

export default function AgentForm({ onCreated }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'' })
  const [error, setError] = useState(null)
  const [ok, setOk] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null); setOk(null); setLoading(true)
    try {
      await api.post('/api/agents', form)
      setOk('Agent created')
      setForm({ name:'', email:'', phone:'', password:'' })
      onCreated?.()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create agent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <div style={{display:'grid', gap:8}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
          required style={{padding:10, borderRadius:8, border:'1px solid #ccc'}} />
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
          required style={{padding:10, borderRadius:8, border:'1px solid #ccc'}} />
        <input placeholder="Mobile with country code" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
          required style={{padding:10, borderRadius:8, border:'1px solid #ccc'}} />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}
          required style={{padding:10, borderRadius:8, border:'1px solid #ccc'}} />
        {error && <div style={{color:'crimson'}}>{error}</div>}
        {ok && <div style={{color:'green'}}>{ok}</div>}
        <button disabled={loading} style={{padding:10, borderRadius:8, background:'#111', color:'#fff', border:'none'}}>
          {loading ? 'Saving...' : 'Add Agent'}
        </button>
      </div>
    </form>
  )
}
