"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { FiUserPlus, FiSearch, FiMessageCircle } from "react-icons/fi";
import { getLocalStorageItem } from "@/lib/localStorage";
import { useLoadingContext } from "../context/Loading";

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>();
  const { startLoading, stopLoading } = useLoadingContext();
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);
  const [friendRequests, setFriendRequests] = useState<any>([]);
  const [once, setOnce] = useState<boolean>(true);

  useEffect(() => {
    if (once) {
      fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setUser(response.data);
        });

      fetch("/api/user/peoples", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data);
          setFriends(response.data.friends);
          setFriendRequests(response.data.friend_request);
        });

      setOnce(false);
    }
  });

  const handleSearch = () => {
    if (searchTerm) {
      startLoading();
      fetch("/api/user/peoples/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getLocalStorageItem("token", ""),
        },
        body: JSON.stringify({
          query: searchTerm,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          setSearchResults(response.data);
          stopLoading();
        });
    }
  };

  const handleSendRequest = (email: any) => {
    // Replace with actual friend request logic
    // console.log(`Friend request sent to user with ID: ${userId}`);
    fetch("/api/user/peoples/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token", ""),
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  };

  const handleAccept = (email: any) => {
    fetch("/api/user/peoples/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token", ""),
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  };

  const handleChatRedirect = (friendId: any) => {
    location.href = `/chat?userId=${friendId}`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                onClick={handleSearch}
                variant="contained"
                color="primary"
              >
                <FiSearch />
              </Button>
            ),
          }}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Search Results</h2>
        <List>
          {searchResults &&
            searchResults.map((user: any) => (
              <ListItem key={user.id} className="flex items-center">
                <ListItemAvatar>
                  <Avatar src={user.photo} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSendRequest(user.email)}
                >
                  <FiUserPlus className="mr-2" /> Send Request
                </Button>
              </ListItem>
            ))}
        </List>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Friend Request</h2>
        <List>
          {friendRequests.map((friendRequest: any) => (
            <ListItem
              key={friendRequest.id}
              className="flex items-center cursor-pointer"
            >
              <ListItemAvatar>
                <Avatar src={friendRequest.photo} />
              </ListItemAvatar>
              <ListItemText primary={friendRequest.user.name} />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAccept(friendRequest.user.email)}
              >
                <FiUserPlus className="mr-2" /> Accept
              </Button>
            </ListItem>
          ))}
        </List>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Friends</h2>
        <List>
          {friends.map((friend: any) => (
            <ListItem
              key={friend.id}
              className="flex items-center cursor-pointer"
              onClick={() => handleChatRedirect(friend._id)}
            >
              <ListItemAvatar>
                <Avatar src={friend.photo} />
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
              <FiMessageCircle className="ml-2" />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Friends;
