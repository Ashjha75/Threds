"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function login() {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const onSignup = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/signin", user);
      toast.success(response.data.message);
      router.push("/onboarding");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col h-screen items-center justify-center ">
        <h1>Login</h1>
        <form className="p-10 backdrop-blur-sm bg-gray-200/30 rounded-md border-2 border-white  flex flex-col m-20 w-[350px] gap-y-5 ">
          <label htmlFor="last">Email</label>
          <input
            className="p-3 text-black outline-none rounded-md"
            type="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="last">Password</label>
          <input
            className="p-3 text-black outline-none rounded-md"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="p-2 w-[80px] mx-auto border-2 border-white rounded-md"
            type="submit"
            onClick={onSignup}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
