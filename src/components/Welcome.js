import React, { useEffect } from "react";
import { useState } from "react";
import wel from "../images/images2.jpeg";
function Welcome({ currentUser }) {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(await JSON.parse(localStorage.getItem("userInfo")).username);
  }, []);
  return (
    <div className="flex justify-center font-poppins text-emerald-400 items-center h-1/2">
      <div className="my-4">
        <img src={wel} alt="" className="z-0" />
        <div className="mt-11">
          <h1 className=" md:text-3xl my-3">
            Welcome,
            <span className="text-emerald-100 mx-1">{userName}!</span>👋🏽
          </h1>
          <p className="my-3">Please select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
