"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthProtection } from "@/hook/useAuthProtection";
import LogOutButton from "@/component/logOutButton";
import TrueMAOCalculatorV2 from "@/component/TrueMAOCalculatorV2";
import SavedCalculations from "@/component/SavedCalculations"; // Adjust path

export default function DashboardPage() {
  const loading = useAuthProtection();
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (!loading) {
      const stored = JSON.parse(localStorage.getItem("deals") || "[]");
      setDeals(stored);
    }
  }, [loading]);

  if (loading) return <p className={"default-layout"}>Loading...</p>;

  return (
    <div className="dashboard flex flex-col gap-4">
      <h1>Deal Dashboard</h1>

      <Link href="/deal/new">
        <button>Add New Deal</button>
      </Link>

      <ul>
        {deals.map((deal, i) => (
          <li key={deal.id || i}>
            <Link href={`/deal/${deal.id}`}>
              {deal.address || `Deal ${i + 1}`}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/deal/v2">
        <button>Add New Deal V2.0</button>
      </Link>
      <SavedCalculations />

      <LogOutButton />
    </div>
  );
}
