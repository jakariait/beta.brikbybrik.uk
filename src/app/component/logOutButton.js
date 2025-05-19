import React from "react";
import {useRouter} from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.replace("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogOutButton;
