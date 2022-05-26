import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function UsersContact({ handleChatChange, contacts, currentUser }) {
  const navigate = useNavigate();
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(null);
  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem("userInfo"));
    setCurrentUserName(user.username);
    setCurrentUserImage(user.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };
  const handleLogOut = async () => {
    const id = await JSON.parse(localStorage.getItem("userInfo"))._id;
    const data = await axios.get(
      `https://jaychats.herokuapp.com/v1/auth/logout/${id}`
    );
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <>
      <div>
        <h1 className="md:text-3xl font-poppins text-emerald-300">JayChats</h1>
        {currentUserName && currentUserImage ? (
          <>
            {" "}
            <div className="text-emerald-400 font-poppins h-[80vh] overflow-scroll remove-scroll">
              <h1 className="md:text-2xl my-2">Users</h1>
              {contacts.map((contact, i) => {
                return (
                  <div>
                    <div
                      className="flex items-center p-4 bg-zinc-700 my-2 hover:bg-zinc-500 rounded-md active:bg-zinc-200 cursor-pointer"
                      onClick={() => changeCurrentChat(i, contact)}
                    >
                      <div
                        className={`contact w-10 mx-6  ${
                          i === currentSelected ? "selected" : ""
                        }`}
                        key={i}
                      >
                        <img
                          src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <h3>{contact.username}</h3>
                      </div>
                    </div>{" "}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center text-emerald-400 font-poppins mt-2 p-4">
              <div className="w-10 mx-6">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div>
                <h1>{currentUserName}</h1>
              </div>
              <div className="w-14 mx-3">
                <div
                  className="btn p-1 btn-accent w-full btn-sm"
                  onClick={handleLogOut}
                >
                  <span className="text-xs">logout</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>no users</div>
        )}
      </div>
    </>
  );
}

export default UsersContact;
