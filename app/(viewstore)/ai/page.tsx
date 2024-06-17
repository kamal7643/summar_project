"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { getLocalStorageItem } from "@/lib/localStorage";
import { AiOutlineSend } from "react-icons/ai";
import { useUser } from "@/app/context/User";
import { TextField, Button } from "@mui/material";

const Page = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, expiredSession, fetchUser } = useUser();

  useEffect(() => {
    // Automatically focus on the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputText === "") return;
    fetch("/api/user/my-ai", {
      method: "POST",
      body: JSON.stringify({ prompt: inputText }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token", ""),
      },
    })
      .then((data) => data.json())
      .then((res: any) => {
        if (res?.success) {
          setMessages([
            ...messages,
            { role: "user", parts: [{ text: inputText }] },
            { role: "model", parts: [{ text: res.text }] },
          ]);
        } else {
          console.log(res);
        }
      });

    setInputText("");
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Chat History */}
      <div className="flex flex-col flex-grow overflow-auto p-4 mb-[100px]">
        {messages.map((message: any, index: any) => (
          <div
            key={index}
            className={`flex  items-start ${message.role === "user" ? "justify-end" : "justify-start"} `}
          >
            <div
              className={`flex items-center pl-4 pr-4
 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white rounded-br-0" : "bg-gray-200"}`}
            >
              {message.parts[0].text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 w-full bg-white px-4 py-2 shadow-md flex items-center">
        <TextField
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          fullWidth
        />
        <Button variant="contained" onClick={sendMessage} className="ml-2">
          <AiOutlineSend />
        </Button>
      </div>
    </div>
  );
};

export default Page;
