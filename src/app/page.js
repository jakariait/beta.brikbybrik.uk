"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// You can add more users here
const users = [
  {
    email: "Workerant71@gmail.com",
    password: "testpassword",
  }
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();

    const isValidUser = users.some(
      (user) => user.email === email && user.password === password
    );

    if (isValidUser) {
      localStorage.setItem("auth", "yes");
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="login-container">
      <h1>Brik by Brik - Beta Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
