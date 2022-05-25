import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatContainer({ currentChat, socket, currentUser }) {
  const id = useSelector((state) => state.token);
  const [chatMessages, setChatMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(async () => {
    await axios
      .post("https://jaychats.herokuapp.com/v1/messages/all", {
        from: id,
        to: currentChat._id,
      })
      .then((response) => {
        console.log(response.data);
        setChatMessages(response.data);
      })
      .catch((error) => {
        AlertDismissible(error?.message, true);
      });
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios
      .post("https://jaychats.herokuapp.com/v1/messages/add", {
        from: id,
        to: currentChat._id,
        message: msg,
      })
      .then((response) => {
        console.log(response);
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: id,
          message: msg,
        });
        const msgs = [...chatMessages];
        msgs.push({ fromSelf: true, message: msg });
        setChatMessages(msgs);
      })
      .catch((error) => {
        AlertDismissible(error?.message, true);
      });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setChatMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chatMessages]);
  async function AlertDismissible(words, error) {
    if (!error) {
      toast.success(words, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(words, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="h-[80%]">
      <ToastContainer
        position="top-center"
        autoClose={1400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {currentChat && (
        <div className="mx-10 h-full flex flex-col justify-end">
          <div className="h-full overflow-y-scroll my-10 messagescrollbar">
            <Messages chatMessages={chatMessages} scrollRef={scrollRef} />
          </div>
          <div className="mt-auto">
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
