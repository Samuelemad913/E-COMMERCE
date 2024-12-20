import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Loading from "./../Loading/Loading";
import {  useNavigate } from "react-router-dom";
export default function Verify() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function verifyCode(values) {
    console.log(values, "==============================>");
    setIsLoading(true);
    const { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => res)
      .catch((err) => err);
    console.log(data);

    if (data.status === "Success") {
      setIsLoading(false);
      navigate("/resetPassword");
    }
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Enter Your Code"),
  });

  const verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyCode,
    validationSchema,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={`container py-5 my-5`}>
        <form className="px-3" onSubmit={verifyFormik.handleSubmit}>
          <div className="form-group mb-2">
            <label className="mb-1" htmlFor="resetCode">
              <h5>ResetCode:</h5>
            </label>
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              placeholder="Enter Code"
              className="form-control mb-2"
              value={verifyFormik.values.resetCode.toString()}
              onChange={verifyFormik.handleChange}
              onBlur={verifyFormik.handleBlur}
            />
            {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ? (
              <div className="alert alert-danger">
                {verifyFormik.errors.resetCode}
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            disabled={!(verifyFormik.isValid && verifyFormik.dirty)}
            type="submit"
            className="btn bg-main text-white my-4"
          >
            Verify
          </button>
        </form>
      </div>
    </>
  );
}
