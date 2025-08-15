import { useEffect, useState } from 'react'

export default function App() {
  const [hello, setHello] = useState('')
  const [sum, setSum] = useState(null)

  useEffect(() => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(d => setHello(d.message))
      .catch(console.error)
  }, [])

  const add = async () => {
    const r = await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 5, b: 7 })
    })
    const d = await r.json()
    setSum(d.result)
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Control Panel</h1>
      <p>From Flask: {hello}</p>
      <button onClick={add}>Add 5 + 7</button>
      {sum !== null && <p>Sum: {sum}</p>}
    </div>
  )
}
