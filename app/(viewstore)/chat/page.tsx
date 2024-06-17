"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { HiOutlineSun } from "react-icons/hi";
import { getLocalStorageItem } from "@/lib/localStorage";
import { MdAddCall, MdMenu } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import { useLoadingContext } from "@/app/context/Loading";

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const [update, setUpdate] = useState<boolean>(true);
  const [user, setUser] = useState<any>();
  const [friends, setFriends] = useState<any>([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { startLoading, stopLoading } = useLoadingContext();

  const fetchFreiends = async () => {
    try {
      startLoading();
      fetch("/api/user/peoples", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFriends(data.data.friends);
          stopLoading();
        });
    } catch (error) {
      console.error("Error fetching friends:", error);
      stopLoading();
    }
  };

  const fetchOtherUser = async () => {
    if (!userId) return;
    try {
      startLoading();
      fetch("/api/user/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
        body: JSON.stringify({ id: userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.data);
          stopLoading();
        });
    } catch (error) {
      console.error("Error fetching Other user:", error);
      stopLoading();
    }
  };

  const fetchMessages = async (userId: string) => {
    if (!userId) return;
    try {
      startLoading();
      const response = await fetch("/api/user/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();
      setMessages(data.data);
      stopLoading();
    } catch (error) {
      console.error("Error fetching messages:", error);
      stopLoading();
    }
  };

  useEffect(() => {
    if (update) {
      fetchFreiends();
      fetchOtherUser();
      fetchMessages(userId);

      setUpdate(false);
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // sendMessage();
    }
  };

  const sendMessage = async () => {
    try {
      await fetch(`/api/user/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
        body: JSON.stringify({ receiver: userId, body: inputText }),
      });
      // After sending message, fetch updated messages
      fetchMessages(userId!);
      // Clear the input field
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // return (
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-2xl font-bold mb-4">Chat with User: {user?.name}</h1>
  //     <div className="mb-4">
  //       {messages.map((message, index) => (
  //         <div key={index} className="bg-gray-200 p-2 rounded-md mb-2">
  //           {message}
  //         </div>
  //       ))}
  //     </div>
  //     <div className="flex">
  //       <input
  //         type="text"
  //         value={newMessage}
  //         onChange={(e) => setNewMessage(e.target.value)}
  //         placeholder="Type your message..."
  //         className="flex-grow rounded-md border px-2 py-1 mr-2"
  //       />
  //       <button
  //         onClick={sendMessage}
  //         className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
  //       >
  //         Send <HiOutlineSun className="ml-2" />
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full  bg-white flex ">
      <div className="min-h-[900px] border-r-2 w-[250px]">
        <div>
          <List>
            {friends.map((friend: any) => (
              <ListItem
                key={friend.id}
                className={
                  "flex items-center cursor-pointer hover:shadow-2xl border-b-2 "
                }
                onClick={() => (location.href = "/chat?userId=" + friend._id)}
              >
                <ListItemAvatar>
                  <Avatar src={friend.photo} />
                </ListItemAvatar>
                <ListItemText primary={friend.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="w-full">
        {user && (
          <div className="flex flex-col justify-between min-h-[900px]">
            <div className="flex w-full justify-between border-b-2 p-2">
              <div className="flex items-center space-x-4">
                <Avatar src={user.photo} />
                <span>{user.name}</span>
              </div>

              <div className="flex items-center space-x-4">
                <MdAddCall />
                <MdMenu />
              </div>
            </div>

            <div className="flex flex-col justify-start h-full">
              {messages &&
                messages.map((message: any, index) => (
                  <div
                    key={index}
                    className={
                      " p-2 " + (message?.sender === userId ? "" : "text-end")
                    }
                  >
                    <span
                      className={
                        "p-2 rounded-lg " +
                        (message?.sender.toString() === userId.toString()
                          ? "bg-gray-200"
                          : "bg-blue-200")
                      }
                    >
                      {message.text}
                    </span>
                  </div>
                ))}
            </div>
            <div className="bottom-0 left-[250px] w-full bg-white px-4 py-2 flex items-center">
              <TextField
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                fullWidth
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                className="ml-2"
              >
                <AiOutlineSend />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Chat() {
  return (
    <Suspense>
      <ChatPage />
    </Suspense>
  );
}
export default Chat;
