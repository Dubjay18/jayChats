import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function LoginFrom({ handleSign }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      axios
        .post(`https://jaychats.herokuapp.com/v1/auth/login`, values)
        .then((response) => {
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          if (response.data.isAvatarImageSet === false) {
            navigate("/setAvatar");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          AlertDismissible(error?.message, true);
        });
    },
  });
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
    <div className="h-screen bg-slate-800 flex items-center justify-center">
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
      <form
        className="shadow-2xl py-5 px-10 w-fit rounded-2xl "
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-emerald-400 text-3xl font-bold underline my-2">
          Login
        </h1>

        <div className="md:p-5 p-1  flex flex-col ">
          <label className="text-emerald-400">Username</label>
          <input
            type="text"
            className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
            id="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-600">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="md:p-5 p-1  flex flex-col ">
          <label className="text-emerald-400">Password</label>
          <input
            type="password"
            id="password"
            className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="p-5   ">
          <button
            type="submit"
            className="btn btn-outline border-emerald-400 font-poppins text-emerald-400 hover:bg-emerald-400"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-wrap justify-between">
          <p>
            Don't have an account?{" "}
            <span
              className="text-emerald-400 cursor-pointer hover:text-emerald-500"
              onClick={() => handleSign(true)}
            >
              Sign Up
            </span>
          </p>
          <p className="cursor-pointer hover:text-emerald-400">
            forgot password
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginFrom;
