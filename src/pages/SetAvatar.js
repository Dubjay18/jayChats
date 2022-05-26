import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetAvatar() {
  const api = "https://api.multiavatar.com/4238383";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, []);

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  async function setProfilePicture() {
    if (selectedAvatar === undefined) {
      console.log("error");
    } else {
      const user = await JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.post(
        `https://jaychats.herokuapp.com/v1/avatar/set/${user._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/");
      } else {
        AlertDismissible("Error setting avatar", true);
      }
    }
  }
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
    <div className="flex items-center justify-center h-screen">
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
      <div className="flex flex-col items-center max-w-[640px]">
        {isloading ? (
          <h1 className="text-emerald-400 md:text-4xl">loading...</h1>
        ) : (
          <>
            {" "}
            <h1 className="md:text-3xl my-3 text-emerald-400">
              Pick an avatar as your profile picture
            </h1>
            <div className="flex">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar mx-2 rounded-full ${
                      selectedAvatar === index
                        ? "border-4 border-lime-500  "
                        : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      className="w-full cursor-pointer"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="btn btn-accent my-4" onClick={setProfilePicture}>
              SET AS PROFILE PICTURE
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SetAvatar;
