// TODO: Refactor to implement react routing such that Sean can access this info via a different page
import React from 'react';
import { useEffect, useState } from 'react'

export default function API_Status() {
  const [hello, setHello] = useState('')
  const [sum, setSum] = useState(null)
  const [info, setInfo] = useState(null)
  const [apiUp, setApiUp] = useState(false)

  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(() => setApiUp(true)).catch(() => setApiUp(false))
    fetch('/api/hello').then(r => r.json()).then(d => setHello(d.message)).catch(console.error)
    fetch('/api/site-info').then(r => r.json()).then(setInfo).catch(console.error)
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
    <div style={{ padding: 20, fontFamily: 'system-ui, Arial' }}>
      <h1>Legionnaire Control Panel (Vite)</h1>
      <p>Status: <b style={{color: apiUp ? 'green' : 'crimson'}}>{apiUp ? 'API online' : 'API offline'}</b></p>
      <p>From Flask: <b>{hello}</b></p>
      <button onClick={add} style={{ padding: '8px 12px', borderRadius: 6 }}>Add 5 + 7</button>
      {sum !== null && <p>Sum from API: <b>{sum}</b></p>}
      <h3>Site Info</h3>
      {info ? (
        <ul>
          <li><b>Name:</b> {info.name}</li>
          <li><b>Version:</b> {info.version}</li>
          <li><b>Environment:</b> {info.environment}</li>
          <li><b>Backend:</b> {info.backend}</li>
        </ul>
      ) : <p>Loading…</p>}
    </div>
  )
}
