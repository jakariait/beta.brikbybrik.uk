"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { calculateMAO } from "@/utils/maoCalculatorV2";
import { generateInvestorPDF } from "@/utils/pdfUtils";
import { exportDealZIP } from "@/utils/zipUtils";
import { generateOfferLetter } from "@/utils/offerLetter";
import LogOutButton from "@/component/logOutButton";

export default function DetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      const stored = localStorage.getItem("maoHistory");
      if (stored) {
        const allItems = JSON.parse(stored);
        const matched = allItems.find((item) => item.id === id);
        setData(matched);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Calculation not found.
      </div>
    );
  }

  // Handler functions
  function handlePDF() {
    generateInvestorPDF(data);
  }

  function handleZIP() {
    exportDealZIP(data);
  }

  function handleOffer() {
    const letter = generateOfferLetter(data);
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "OfferLetter.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="default-layout p-6 max-w-2xl mx-auto bg-white rounded shadow flex flex-col gap-2">
      <h1 className="text-lg font-bold">Deal Details</h1>

      <div>
        <h2>
          <strong>Address:</strong> {data.address}
        </h2>
        <p>
          <strong>Date:</strong> {new Date(data.timestamp).toLocaleString()}
        </p>
        <p>
          <strong>GDV:</strong> £{data.gdv.toLocaleString()}
        </p>
        <p>
          <strong>Purchase Price:</strong> £
          {data.purchasePrice.toLocaleString()}
        </p>
        <p>
          <strong>Refurb Cost:</strong> £{data.refurbCost.toLocaleString()}
        </p>
        <p>
          <strong>Other Costs:</strong> £{data.otherCosts.toLocaleString()}
        </p>
      </div>

      <p className="font-medium">ROI MAOs:</p>
      <ul className="list-disc ml-6 text-blue-700">
        {Array.isArray(data.roiTiers) ? (
          data.roiTiers.map((roi, i) => (
            <li key={i}>
              ROI {roi * 100}%: £
              {calculateMAO({
                gdv: data.gdv,
                roiPercent: roi,
                refurbCost: data.refurbCost,
                otherCosts: data.otherCosts,
              }).toLocaleString()}
            </li>
          ))
        ) : (
          <li>No ROI tiers available</li>
        )}
      </ul>

      <div className="flex flex-col gap-1 mt-4">
        <button
          onClick={handlePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export PDF
        </button>
        <button
          onClick={handleZIP}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export ZIP
        </button>
        <button
          onClick={handleOffer}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Download Offer Letter
        </button>
      </div>

      <LogOutButton />
    </div>
  );
}
