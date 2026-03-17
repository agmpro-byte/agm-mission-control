'use client'

import { useState } from 'react'

export default function TestNav() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  return (
    <div>
      <div>Current Tab: {activeTab}</div>
      <button onClick={() => setActiveTab('clients')}>Switch to Clients</button>
      <button onClick={() => setActiveTab('memory')}>Switch to Memory</button>
    </div>
  )
}