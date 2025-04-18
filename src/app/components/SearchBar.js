'use client';

import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  return (
    <div style={{ display:'flex',justifyContent:'center',padding:'10px' }}>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search Serial Number..."
        style={{ width:'200px',padding:'8px',marginRight:'10px',border:'1px solid #ccc',borderRadius:'4px' }}
      />
      <button onClick={() => onSearch(q)} style={{ width: '100px', height: '40px', marginTop:'8px', padding:'8px 8px',border:'none',borderRadius:'4px',backgroundColor:'#007bff',color:'#fff',cursor:'pointer' }}>
        Search
      </button>
    </div>
  );
}
