import React, { useEffect } from "react";

import { user } from "./../reducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UsersContact from "../components/UsersContact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { useRef } from "react";

function Chats() {
  const socket = useRef();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.userName);
  const id = useSelector((state) => state.token);
  const entry = useSelector((state) => state.entry);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(async () => {
    if (!userName) {
      await navigate("/login");
    } else {
      setCurrentUser(userName);
    }
  }, []);
  useEffect(async () => {
    if (currentUser) {
      socket.current = io("https://jaychats.herokuapp.com");
      socket.current.emit("add-user", id);
    }
  }, [currentUser]);
  useEffect(async () => {
    if (currentUser) {
      if (entry) {
        const response = await axios.get(
          `https://jaychats.herokuapp.com/v1/users/AllUsers/${id}`
        );

        setContacts(response.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (e) => {
    setCurrentChat(e);
    console.log(currentChat);
  };

  return (
    <div className="h-screen bg-slate-800 flex ">
      <div className="drawer  drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div className="bg-base-100 border-x-2 flex items-center px-5 py-10">
            {" "}
            <label
              for="my-drawer-2"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            {currentChat ? (
              <div className="flex items-center">
                <div className=" w-16 ">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="mx-4">
                  <p className="font-poppins md:text-xl font-bold">
                    {currentChat.username}
                  </p>
                </div>
              </div>
            ) : (
              <p>Welcome</p>
            )}
          </div>
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
        <div className="drawer-side">
          <label for="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu h-full p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <UsersContact
              contacts={contacts}
              currentUser={currentUser}
              handleChatChange={handleChatChange}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chats;
