import React, { useEffect, useState } from "react";
import SignupForm from "./../components/SignupForm";
import LoginFrom from "./../components/LoginFrom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";
import Navbar from "../components/Navbar";
function Login() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.userName);
  const [sign, setSign] = useState(false);
  const [email, setEmail] = useState("");

  const handleSign = (e) => {
    setSign(e);
  };

  useEffect(async () => {
    if (userName) {
      await navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-slate-800 flex items-center justify-center">
      <Navbar />
      <div className=" font-poppins max-w-[640px] w-full">
        {sign ? (
          <SignupForm handleSign={handleSign} />
        ) : (
          <LoginFrom handleSign={handleSign} />
        )}
      </div>
    </div>
  );
}

export default Login;
