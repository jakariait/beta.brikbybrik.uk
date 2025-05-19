"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Page() {
  const [deals, setDeals] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem('auth');
      if (auth !== 'yes') window.location = '/';
      const stored = JSON.parse(localStorage.getItem('deals') || '[]');
      setDeals(stored);
    }
  }, []);
  return (
    <div className="dashboard">
      <h1>Deal Dashboard</h1>
      <Link href="/deal/new"><button>Add New Deal</button></Link>
      <ul>
        {deals.map((deal, i) => (
          <li key={i}>
            <Link href={`/deal/${deal.id}`}>{deal.address || `Deal ${i+1}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}