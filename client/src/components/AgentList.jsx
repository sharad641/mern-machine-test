export default function AgentList({ agents=[] }) {
  if (!agents.length) return <div>No agents yet.</div>
  return (
    <div style={{maxHeight:220, overflow:'auto'}}>
      <table width="100%" cellPadding="8" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #eee'}}>
            <th>Name</th><th>Email</th><th>Phone</th><th>Created</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(a => (
            <tr key={a._id} style={{borderBottom:'1px solid #f2f2f2'}}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
