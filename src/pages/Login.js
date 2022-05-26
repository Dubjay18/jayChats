import React, { useEffect, useState } from "react";
import SignupForm from "./../components/SignupForm";
import LoginFrom from "./../components/LoginFrom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Login() {
  const navigate = useNavigate();
  const [sign, setSign] = useState(false);
  const handleSign = (e) => {
    setSign(e);
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
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
