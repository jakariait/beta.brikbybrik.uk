"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthProtection() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== "yes") {
      router.replace("/");  // Use replace to avoid back button confusion
    } else {
      setLoading(false);
    }
  }, [router]);

  return loading;
}
