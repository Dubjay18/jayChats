import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ handleSign }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      username: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      passwordConfirmation: Yup.string()
        .required("No password provided.")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      axios
        .post(`https://jaychats.herokuapp.com/v1/auth/register`, values)
        .then((response) => {
          console.log(response);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          window.location.reload();
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
          Sign Up
        </h1>
        <div className="flex flex-wrap">
          <div className="md:p-5 p-1  flex flex-col ">
            <label className="text-emerald-400" htmlFor="firstName">
              First name
            </label>
            <input
              type="text"
              className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
              id="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-600">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="md:p-5 p-1  flex flex-col ">
            <label className="text-emerald-400" htmlFor="lastName">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-600">{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="md:p-5 p-1  flex flex-col ">
            <label className="text-emerald-400" htmlFor="username">
              Username
            </label>
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
            <label className="text-emerald-400" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
              id="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="md:p-5 p-1  flex flex-col ">
            <label className="text-emerald-400" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="md:p-5 p-1  flex flex-col ">
            <label htmlFor="passwordConfirmation" className="text-emerald-400">
              Confirm Password
            </label>
            <input
              className="rounded-md bg-slate-700 px-1 md:py-2 outline-none text-white"
              id="passwordConfirmation"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirmation}
            />
            {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation ? (
              <div className="text-red-600">
                {formik.errors.passwordConfirmation}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline border-emerald-400 font-poppins text-emerald-400 hover:bg-emerald-400"
        >
          Submit
        </button>
        <div className="flex flex-wrap justify-between">
          <p>
            Already have an account?{" "}
            <span
              className="text-emerald-400 cursor-pointer hover:text-emerald-500"
              onClick={() => handleSign(false)}
            >
              Login
            </span>
          </p>
          <p className="d cursor-pointer hover:text-emerald-400">
            forgot password
          </p>
        </div>
      </form>
    </div>
  );
};
export default SignupForm;
