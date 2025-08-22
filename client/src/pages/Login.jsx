import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try {
      const { data } = await api.post('/api/auth/login', form)
      login(data)
      nav('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'100vh', fontFamily:'sans-serif'}}>
      <form onSubmit={onSubmit} style={{width:360, padding:24, border:'1px solid #ddd', borderRadius:12}}>
        <h2>Admin Login</h2>
        <div style={{marginTop:12}}>
          <label>Email</label>
          <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
            style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #ccc'}} />
        </div>
        <div style={{marginTop:12}}>
          <label>Password</label>
          <input type="password" required value={form.password} onChange={e=>setForm({...form, password:e.target.value})}
            style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #ccc'}} />
        </div>
        {error && <div style={{color:'crimson', marginTop:8}}>{error}</div>}
        <button disabled={loading} type="submit" style={{marginTop:16, width:'100%', padding:12, borderRadius:8, border:'none', background:'#111', color:'#fff'}}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{marginTop:12, fontSize:12, opacity:0.7}}>Tip: Seed an admin via /api/auth/seed-admin first.</p>
      </form>
    </div>
  )
}
