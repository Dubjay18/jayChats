import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function UsersContact({ handleChatChange, contacts, currentUser }) {
  const userImage = useSelector((state) => state.image);
  const [currentSelected, setCurrentSelected] = useState(null);
  useEffect(() => {}, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    console.log("dsb");
    handleChatChange(contact);
  };
  return (
    <>
      <div>
        <h1 className="md:text-3xl font-poppins text-emerald-300">JayChats</h1>
        {userImage && currentUser ? (
          <>
            {" "}
            <div className="text-emerald-400 font-poppins h-[670px] overflow-scroll remove-scroll">
              <h1 className="md:text-2xl">Users</h1>
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
                  src={`data:image/svg+xml;base64,${userImage}`}
                  alt="avatar"
                />
              </div>
              <div>
                <h1>{currentUser}</h1>
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
