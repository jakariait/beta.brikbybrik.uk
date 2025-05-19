"use client";
import { useState } from "react";
import { calculateTrueMAO } from "@/utils/maoCalculator";
import { useAuthProtection } from "@/hook/useAuthProtection";
import LogOutButton from "@/app/component/logOutButton"; // Adjust path


export default function NewDeal() {

  const loading = useAuthProtection();

  const [form, setForm] = useState({
    address: "",
    gdv: "",
    refurb: "",
    fees: "",
    finance: "",
    profit: "",
  });
  const [result, setResult] = useState(null);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const calc = calculateTrueMAO({
      gdv: Number(form.gdv),
      refurb: Number(form.refurb),
      fees: Number(form.fees),
      finance: Number(form.finance),
      profitMargin: Number(form.profit),
    });
    setResult(calc);
    // Save to localStorage
    const all = JSON.parse(localStorage.getItem("deals") || "[]");
    const id = Date.now().toString();
    all.push({ ...form, id, mao: calc });
    localStorage.setItem("deals", JSON.stringify(all));
    router.push("/dashboard");
  }

  if (loading) return <p className={"default-layout"}>Loading...</p>;

  return (
    <div className={"default-layout"}>
      <h1>Add New Deal</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="address"
          placeholder="Property Address"
          onChange={handleChange}
          required
        />
        <input
          name="gdv"
          placeholder="GDV ()"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="refurb"
          placeholder="Refurb ()"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="fees"
          placeholder="Fees ()"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="finance"
          placeholder="Finance ()"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="profit"
          placeholder="Profit Margin (%)"
          type="number"
          onChange={handleChange}
          required
        />
        <button type="submit">Calculate & Save</button>
      </form>
      {result !== null && <div>True MAO: {result.toLocaleString()}</div>}

      <LogOutButton/>
    </div>
  );
}
