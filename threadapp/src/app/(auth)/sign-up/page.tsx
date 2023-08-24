"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const onSignup = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/signup", user);
      toast.success(response.data.message);
      router.push("/onboarding");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
    }
  };

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex flex-col h-screen items-center justify-center ">
        <h1>Signup</h1>
        <form
          className="p-10 backdrop-blur-sm bg-white/30 rounded-md border-2 border-white flex flex-col m-20 w-[380px] gap-y-5 "
          onSubmit={onSignup}
        >
          <label htmlFor="first">First name:</label>
          <input
            className="p-3 text-black outline-none rounded-md"
            placeholder="userName"
            type="text"
            name="userName"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label htmlFor="last">Email</label>
          <input
            className="p-3 text-black outline-none rounded-md"
            type="text"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="last">Password</label>
          <input
            className="p-3  text-black outline-none rounded-md"
            type="password"
            name="password"
            value={user.password}
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="p-2 w-[80px] mx-auto border-2 bg-black border-white rounded-md"
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
