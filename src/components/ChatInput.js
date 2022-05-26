import React from "react";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  const handleEmojiClick = async (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    console.log(emoji);
    await setMsg(message);
  };
  const handleEmojiToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="flex">
      <div className=" flex w-fit flex-row-reverse items-center">
        {showEmojiPicker && (
          <Picker preload="true" onEmojiClick={handleEmojiClick} native />
        )}
        <BsEmojiSmileFill
          className="md:w-10 text-yellow-400 h-full hover:text-yellow-200 transition-all duration-300 cursor-pointer"
          onClick={handleEmojiToggle}
        />
      </div>
      <form
        className="flex items-center w-full"
        onSubmit={(e) => sendMessage(e)}
      >
        <input
          type="text"
          className="input input-accent text-white w-full mx-5"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="btn btn-accent">
          <IoMdSend className="text-xl" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
