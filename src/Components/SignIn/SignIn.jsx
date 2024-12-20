import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
export default function SignIn() {
  const { setToken, setUserData } = useContext(TokenContext);

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function callLogin(reqbody) {
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", reqbody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    if (data?.message === "success") {
      localStorage.setItem("token", data.token);
      setToken(data?.token);
      setUserData(data?.user);
      navigate("/home");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid Password")
      .required("Password is required"),
  });

  const loginValues = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
      <Helmet>
        <title>Ecommerce | Login</title>
      </Helmet>
      <section className="w-75 mx-auto my-4 bg-light p-4 rounded ">
        <h3 className="text-center mb-3">Login Now:</h3>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}

        <form onSubmit={loginValues.handleSubmit} className="py-3">
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
              value={loginValues.values.email}
              onChange={loginValues.handleChange}
              onBlur={loginValues.handleBlur}
            />
            {loginValues.errors.email && loginValues.touched.email ? (
              <div className="alert alert-danger">
                {loginValues.errors.email}
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
              value={loginValues.values.password}
              onChange={loginValues.handleChange}
              onBlur={loginValues.handleBlur}
            />
            {loginValues.errors.password && loginValues.touched.password ? (
              <div className="alert alert-danger">
                {loginValues.errors.password}
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
              "Login"
            )}
          </button>
        </form>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            Don't Have an account ?{" "}
            <Link className="text-main fw-bold" to={"/register"}>
              Register Now
            </Link>
          </span>
          <span>
            <Link
              className="fw-bold text-success bg-body-tertiary"
              to={"/forget-password"}
            >
              forget your password ?
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}
