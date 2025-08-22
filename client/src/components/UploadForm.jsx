import { useState } from 'react'
import api from '../api/axios.js'

export default function UploadForm({ onDone }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null); setResult(null)
    if (!file) return setError('Please choose a file')
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['csv','xlsx','xls','axls'].includes(ext)) return setError('Only csv, xlsx, xls, axls allowed')

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    try {
      const { data } = await api.post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setResult(data)
      onDone?.(data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submit} style={{display:'flex', gap:8, alignItems:'center'}}>
        <input type="file" accept=".csv,.xlsx,.xls,.axls" onChange={e=>setFile(e.target.files?.[0])} />
        <button disabled={loading} style={{padding:'8px 12px'}}>Upload</button>
      </form>
      {error && <div style={{color:'crimson', marginTop:8}}>{error}</div>}
      {result && (
        <div style={{marginTop:12, fontSize:14}}>
          <div><b>Batch:</b> {result.batchId}</div>
          <div><b>Total:</b> {result.total}</div>
          <div style={{marginTop:8}}>
            <b>Distribution:</b>
            <ul>
              {result.distribution.map(d => (
                <li key={d.agentId}>{d.name} ({d.email}) - {d.count}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
