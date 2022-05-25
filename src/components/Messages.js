import React from "react";
import { v4 as uuidv4 } from "uuid";

function Messages({ chatMessages, scrollRef }) {
  return (
    <div className="my-3  h-full">
      {chatMessages?.map((message, i) => {
        return (
          <div
            key={uuidv4()}
            ref={scrollRef}
            className={`flex py-2 ${message.fromSelf ? "justify-end" : ""}`}
          >
            <div
              className={`p-2 flex text-white font-poppins  bg-slate-900 w-1/3 rounded-md border-2 ${
                message.fromSelf
                  ? " border-emerald-500 justify-end"
                  : "border-red-500"
              }`}
            >
              {message.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
