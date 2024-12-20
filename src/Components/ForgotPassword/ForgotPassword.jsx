import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Loading from "./../Loading/Loading";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  async function checkemail(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords
        `,
        values
      )
      .then((res) => res)
      .catch((err) => err);
    console.log(data);
    if (data?.statusMsg === "success") {
      toast.success(data?.message);
      setIsLoading(false);
      navigate("/verify");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });

  const verifyemail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: checkemail,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={`container py-5 my-5`}>
        <form className="px-3" onSubmit={verifyemail.handleSubmit}>
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="email">
              <h5>Email:</h5>
            </label>
            <input
              autoComplete="true"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="form-control mb-2"
              value={verifyemail.values.email}
              onChange={verifyemail.handleChange}
              onBlur={verifyemail.handleBlur}
            />
            {verifyemail.errors.email && verifyemail.touched.email ? (
              <div className="alert alert-danger">
                {verifyemail.errors.email}
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn bg-success text-white my-3 fw-bold px-5 d-block mx-auto ">
            Send Verification Code
          </button>
        </form>
      </div>
    </>
  );
}
