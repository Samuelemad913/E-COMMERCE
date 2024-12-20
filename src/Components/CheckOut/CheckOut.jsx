import React, { useContext } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup";

export default function CheckOut() {
  let { onlinePayment } = useContext(CartContext);

  async function payment(values) {
    let { data } = await onlinePayment(values);
    window.location.href = data.session.url;
  }

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone Number")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: payment,
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>Ecommerce | CheckOut</title>
      </Helmet>
      <section>
        <div className="container my-5 py-5 ">
          <h2>Shipping Information</h2>
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="form-group mb-2">
              <label className="py-1" htmlFor="details">
                Details:
              </label>
              <input
                type="text"
                className="form-control"
                id="details"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter shipping Details"
              />
              {formik.errors.details && formik.touched.details ? (
                <div className="alert alert-danger">
                  {formik.errors.details}
                </div>
              ) : null}
            </div>
            <div className="form-group mb-2">
              <label className="py-1" htmlFor="phone">
                Phone:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter  your phone number"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="form-group mb-2">
              <label className="py-1" htmlFor="city">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your City"
              />
              {formik.errors.city && formik.touched.city ? (
                <div className="alert alert-danger">{formik.errors.city}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success w-100 my-2">
              Pay Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
