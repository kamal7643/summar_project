"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { setLocalStorageItem } from "@/lib/localStorage";
import { useAlertContext } from "@/app/context/Alert";
const GoogleButton = dynamic(() => import('@/app/components/GoogleButton'), { ssr: false });

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const { alert } = useAlertContext();
  const handleSignIn = () => {
    fetch("api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          setLocalStorageItem("token", res.data.token);
          location.href = "/";
        } else {
          alert("error", res.message);
          // generateAlert('error', res.message);
        }
      });
  };

  const handleForgotPassword = () => {
    console.log("forgot password");
  };

  useEffect(() => {
    setTimeout(() => {
      if (!hidePassword) {
        setHidePassword(true);
      }
    }, 1500);
  });

  return (
    <div className="w-full h-full flex justify-center items-center select-none">
      <div className="w-[450px] border p-8 mt-32 bg-blue-600 text-white rounded-lg hover:shadow-lg">
        <div className="w-full flex flex-col justify-center items-center mt-[20px] space-y-4">
          <span className="text-[24px]">SIGN-IN</span>
          <button
            onClick={() => {
              alert("error", "got it");
            }}
          >
            error
          </button>
          <span className="text-[14px] text-gray-200">
            Please enter your login and password!
          </span>
        </div>
        <div className="w-full flex flex-col justify-center items-center space-y-4 mt-[40px] text-black">
          <input
            type="text"
            className="w-[300px] p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center">
            <input
              type={hidePassword ? "password" : "text"}
              className="w-[300px] p-2 rounded relative left-[10px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="w-[20px] relative left-[-30px]"
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
            >
              {hidePassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[50px]">
          <button
            className="w-[200px] p-2 rounded bg-white-200 border text-black hover:bg-gray-500 hover:text-white"
            onClick={handleSignIn}
          >
            Sign-in
          </button>
        </div>
        <div>
          <GoogleButton />
        </div>

        <div className="w-full flex justify-center text-[14px] mt-[30px] mb-[30px] cursor-pointer text-gray-300 hover:text-white">
          Forgot password?
        </div>
        <div className="w-full flex justify-center text-[14px]">
          Do not have an account?{" "}
          <span
            className="ml-2 text-gray-300 hover:text-white cursor-pointer"
            onClick={() => (location.href = "/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}
