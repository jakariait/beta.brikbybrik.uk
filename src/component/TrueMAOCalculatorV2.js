"use client";

import React, { useState } from "react";
import { Toggle } from "@radix-ui/react-toggle";
import {
  getRefurbCost,
  getLeaseAdjustment,
  getOtherCosts,
  calculateMAO,
} from "@/utils/maoCalculatorV2";
import LogOutButton from "@/component/logOutButton";

const TrueMAOCalculator = () => {
  const [address, setAddress] = useState("");
  const [gdv, setGdv] = useState(0);
  const [refurbOption, setRefurbOption] = useState("light");
  const [builderCalc, setBuilderCalc] = useState({
    rate: 200,
    duration: 0,
    teamSize: 0,
  });
  const [useBuilderCalc, setUseBuilderCalc] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [refinanceFee, setRefinanceFee] = useState(1000);
  const [leaseYears, setLeaseYears] = useState(99);

  const refurbCost = getRefurbCost(useBuilderCalc, refurbOption, builderCalc);
  const leaseAdj = getLeaseAdjustment(leaseYears);
  const otherCosts = getOtherCosts({
    purchasePrice,
    builderCalc,
    refinanceFee,
    leaseYears,
    refurbCost,
  });

  const roiTiers = [0.15, 0.2, 0.25];

  // New form submit handler to trigger validation before saving
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Custom checks only for builderCalc if enabled
    if (useBuilderCalc) {
      if (
        builderCalc.rate <= 0 ||
        builderCalc.duration <= 0 ||
        builderCalc.teamSize <= 0
      ) {
        alert(
          "Please fill in all builder calculation fields with values greater than zero.",
        );
        return;
      }
    }

    handleSaveCalculation();
  };

  const handleSaveCalculation = () => {
    const savedCalculation = {
      address,
      gdv,
      purchasePrice,
      refurbOption,
      useBuilderCalc,
      builderCalc,
      refurbCost,
      leaseAdj,
      otherCosts,
      refinanceFee,
      leaseYears,
      roiTiers,
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("maoHistory") || "[]");
    const updated = [savedCalculation, ...existing.slice(0, 9)];

    localStorage.setItem("maoHistory", JSON.stringify(updated));
    alert("✅ Calculation saved to local storage!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-[550px] mx-auto bg-white shadow-xl rounded-2xl space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-800">
        🏗️ True MAO 2.0 Calculator
      </h2>

      {/* Property Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Property Address:
        </label>
        <input
          type="text"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter property address"
        />
      </div>

      {/* GDV */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          GDV (£):
        </label>
        <input
          type="number"
          value={gdv}
          min={1}
          required
          onChange={(e) => setGdv(Number(e.target.value))}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Gross Development Value"
        />
      </div>

      {/* Refurbishment Section */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h4 className="text-md font-semibold mb-2 text-gray-700">
          Refurbishment
        </h4>

        <div className="grid grid-cols-4 items-center mb-4">
          <span className="col-span-3 text-sm font-medium text-gray-700">
            Use Builder Calculation
          </span>
          <Toggle
            pressed={useBuilderCalc}
            onPressedChange={setUseBuilderCalc}
            className={`data-[state=on]:bg-blue-600 data-[state=off]:bg-gray-300 rounded-full px-4 py-1 text-white text-xs`}
          >
            {useBuilderCalc ? "On" : "Off"}
          </Toggle>
        </div>

        {!useBuilderCalc ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Refurbishment Option:
            </label>
            <select
              value={refurbOption}
              required
              onChange={(e) => setRefurbOption(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <input
              type="number"
              placeholder="Day Rate"
              min={1}
              required={useBuilderCalc}
              value={builderCalc.rate}
              onChange={(e) =>
                setBuilderCalc({ ...builderCalc, rate: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Duration"
              min={1}
              required={useBuilderCalc}
              value={builderCalc.duration}
              onChange={(e) =>
                setBuilderCalc({
                  ...builderCalc,
                  duration: Number(e.target.value),
                })
              }
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Team Size"
              min={1}
              required={useBuilderCalc}
              value={builderCalc.teamSize}
              onChange={(e) =>
                setBuilderCalc({
                  ...builderCalc,
                  teamSize: Number(e.target.value),
                })
              }
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Purchase Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Purchase Price (£):
        </label>
        <input
          type="number"
          value={purchasePrice}
          min={1}
          required
          onChange={(e) => setPurchasePrice(Number(e.target.value))}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lease */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Lease Years Remaining:
        </label>
        <input
          type="number"
          value={leaseYears}
          min={1}
          required
          onChange={(e) => setLeaseYears(Number(e.target.value))}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {leaseYears > 0 && leaseYears < 55 && (
          <p className="text-red-600 text-sm mt-1 font-medium">
            ⚠️ Warning: Leases under 55 years may not be mortgageable.
          </p>
        )}
      </div>

      {/* Refinance Fee */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Refinance Fee (£):
        </label>
        <input
          type="number"
          value={refinanceFee}
          min={0}
          required
          onChange={(e) => setRefinanceFee(Number(e.target.value))}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* MAO Results */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          📈 MAO Results:
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Refurbishment Cost:{" "}
          <span className="font-medium text-red-700">
            £{refurbCost.toLocaleString()}
          </span>
        </p>

        <p className="text-gray-600 text-sm mb-2">
          Lease Adjustment:{" "}
          <span className="font-medium text-red-700">
            £{leaseAdj.toLocaleString()}
          </span>
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Other Costs:{" "}
          <span className="font-medium text-red-700">
            £{otherCosts.toLocaleString()}
          </span>
        </p>

        {roiTiers.map((roi, i) => (
          <div key={i} className="text-gray-700 text-sm">
            ROI <span className="font-medium">{roi * 100}%</span>:{" "}
            <span className="font-semibold text-blue-700">
              £
              {calculateMAO({
                gdv,
                roiPercent: roi,
                refurbCost,
                otherCosts,
              }).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
      >
        💾 Save Calculation
      </button>
      <LogOutButton />
    </form>
  );
};

export default TrueMAOCalculator;
