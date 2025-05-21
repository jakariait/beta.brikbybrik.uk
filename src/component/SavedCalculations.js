"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { calculateMAO } from "@/utils/maoCalculatorV2";

const SavedCalculations = () => {
  const [savedItems, setSavedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("maoHistory");
    if (stored) {
      let items = JSON.parse(stored);

      // Add unique id if missing (for old items)
      items = items.map((item) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
      }));

      setSavedItems(items);

      // Save updated list with ids back to localStorage
      localStorage.setItem("maoHistory", JSON.stringify(items));
    }
  }, []);

  const handleNavigate = (id) => {
    if (!id) {
      alert("Error: id is undefined!");
      return;
    }
    router.push(`/deal/v2/${id}`);
  };

  if (savedItems.length === 0) {
    return (
      <div className="p-6 bg-white shadow rounded-lg text-gray-700 text-center">
        No saved calculations yet.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        📚 Saved Calculations
      </h3>
      {savedItems.map((item) => (
        <div key={item.id} className="mb-1">
          <p className="text-sm text-gray-700 cursor-pointer ">
            <span
              onClick={() => handleNavigate(item.id)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {item.address}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SavedCalculations;
