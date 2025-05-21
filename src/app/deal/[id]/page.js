"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthProtection } from "@/hook/useAuthProtection";
import { generateInvestorPDF } from "@/utils/pdfUtils";
import { exportDealZIP } from "@/utils/zipUtils";
import { generateOfferLetter } from "@/utils/offerLetter";
import LogOutButton from "@/component/logOutButton";

export default function DealPage() {
  const loading = useAuthProtection();

  const { id } = useParams();
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      const deals = JSON.parse(localStorage.getItem("deals") || "[]");
      setDeal(deals.find((d) => d.id === id));
    }
  }, [id]);
  if (!deal) return <div className={"default-layout"}>Loading...</div>;

  function handlePDF() {
    generateInvestorPDF(deal);
  }

  function handleZIP() {
    exportDealZIP(deal);
  }

  function handleOffer() {
    const letter = generateOfferLetter(deal);
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "OfferLetter.txt";
    a.click();
  }

  if (loading) return <p className={"default-layout"}>Loading...</p>;

  return (
    <div className={"default-layout"}>
      <h1>Deal Details</h1>
      <div>
        <b>Address:</b> {deal.address}
      </div>
      <div>
        <b>GDV:</b> {deal.gdv}
      </div>
      <div>
        <b>Refurb:</b> {deal.refurb}
      </div>
      <div>
        <b>Fees:</b> {deal.fees}
      </div>
      <div>
        <b>Finance:</b> {deal.finance}
      </div>
      <div>
        <b>Profit Margin:</b> {deal.profit}%
      </div>
      <div>
        <b>True MAO:</b> {deal.mao}
      </div>
      <button onClick={handlePDF}>Export PDF</button>
      <button onClick={handleZIP}>Export ZIP</button>
      <button onClick={handleOffer}>Download Offer Letter</button>

      <LogOutButton />
    </div>
  );
}
