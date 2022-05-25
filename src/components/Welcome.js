import React from "react";
import wel from "../images/images2.jpeg";
function Welcome({ currentUser }) {
  return (
    <div className="flex justify-center font-poppins text-emerald-400 items-center h-1/2">
      <div className="my-4">
        <img src={wel} alt="" />
        <div className="mt-11">
          <h1 className=" md:text-3xl my-3">
            Welcome, <span className="text-emerald-100">{currentUser}!</span>👋🏽
          </h1>
          <p className="my-3">Please select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
