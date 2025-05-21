"use client";
import React from "react";

import TrueMAOCalculatorV2 from "@/component/TrueMAOCalculatorV2";
import { useAuthProtection } from "@/hook/useAuthProtection";

const Page = () => {
  const loading = useAuthProtection();
  if (loading) return <p className={"default-layout"}>Loading...</p>;

  return (
    <div>
      <TrueMAOCalculatorV2 />
    </div>
  );
};

export default Page;
