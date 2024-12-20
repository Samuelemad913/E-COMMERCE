import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function SignUp() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function callRegister(reqbody) {
    setIsLoading(true);
    setErrorMessage("");
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", reqbody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });

    if (data.message === "success") {
      navigate("/login");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be 3 charactars or more")
      .max(12, "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid Password")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Not Matching Password")
      .required("RePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone Number")
      .required("Phone number is required"),
  });

  const registerValues = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });

  return (
    <>
    <Helmet>
      <title>Ecommerce | Register</title>
    </Helmet>
      <section className="w-75 mx-auto my-4 bg-light p-4 rounded ">
        <h3 className="text-center mb-3">Register Now:</h3>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}

        <form onSubmit={registerValues.handleSubmit} className="py-3">
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="name">
              <h5>Name:</h5>
            </label>
            <input
              autoComplete="true"
              type="text"
              name="name"
              id="fullName"
              placeholder="Enter Your Name"
              className="form-control mb-2"
              value={registerValues.values.name}
              onChange={registerValues.handleChange}
              onBlur={registerValues.handleBlur}
            />
            {registerValues.errors.name && registerValues.touched.name ? (
              <div className="alert alert-danger">
                {registerValues.errors.name}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="email">
              <h5>Email:</h5>
            </label>
            <input
              autoComplete="true"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email address"
              className="form-control mb-2"
              value={registerValues.values.email}
              onChange={registerValues.handleChange}
              onBlur={registerValues.handleBlur}
            />
            {registerValues.errors.email && registerValues.touched.email ? (
              <div className="alert alert-danger">
                {registerValues.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="password">
              <h5>Password:</h5>
            </label>
            <input
              autoComplete="true"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="form-control mb-2"
              value={registerValues.values.password}
              onChange={registerValues.handleChange}
              onBlur={registerValues.handleBlur}
            />
            {registerValues.errors.password &&
            registerValues.touched.password ? (
              <div className="alert alert-danger">
                {registerValues.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="rePassword">
              <h5>RePassword:</h5>
            </label>
            <input
              autoComplete="true"
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="Enter Password again"
              className="form-control mb-2"
              value={registerValues.values.rePassword}
              onChange={registerValues.handleChange}
              onBlur={registerValues.handleBlur}
            />
            {registerValues.errors.rePassword &&
            registerValues.touched.rePassword ? (
              <div className="alert alert-danger">
                {registerValues.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="phone">
              <h5>Phone:</h5>
            </label>
            <input
              autoComplete="true"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter Phone Number"
              className="form-control mb-2"
              value={registerValues.values.phone}
              onChange={registerValues.handleChange}
              onBlur={registerValues.handleBlur}
            />
            {registerValues.errors.phone && registerValues.touched.phone ? (
              <div className="alert alert-danger">
                {registerValues.errors.phone}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn bg-main text-white my-4 w-100 fw-bold"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <span>
          Already Have an account ? <Link className="text-main fw-bold" to={'/login'}>Login Now</Link>
        </span>
      </section>
    </>
  );
}
