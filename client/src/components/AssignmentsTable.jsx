export default function AssignmentsTable({ grouped=[], loading }) {
  if (loading) return <div>Loading...</div>
  if (!grouped.length) return <div>No data.</div>

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      {grouped.map(g => (
        <div key={g?.agent?._id || Math.random()} style={{border:'1px solid #eee', borderRadius:12, padding:12}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h4 style={{margin:0}}>{g.agent?.name || '(Agent)'}</h4>
            <span style={{opacity:0.7}}>{g.items.length} items</span>
          </div>
          <div style={{maxHeight:240, overflow:'auto', marginTop:8}}>
            <table width="100%" cellPadding="8" style={{borderCollapse:'collapse'}}>
              <thead>
                <tr style={{textAlign:'left', borderBottom:'1px solid #eee'}}>
                  <th>First Name</th><th>Phone</th><th>Notes</th><th>Batch</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map(item => (
                  <tr key={item._id} style={{borderBottom:'1px solid #f7f7f7'}}>
                    <td>{item.firstName}</td>
                    <td>{item.phone}</td>
                    <td>{item.notes}</td>
                    <td>{item.batchId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
