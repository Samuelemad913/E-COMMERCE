import React from "react";
export default function Footer() {
  return (
    <>
      <footer className="bg-success-subtle px-5 pt-3 mt-3">
        <h3>Get The fresh cart App</h3>
        <p>We will send you link , open it on your phone to download the app</p>
        <div className="form-group d-flex pb-3">
          <input
            type="email"
            placeholder="Please enter your email ."
            className="form-control w-75"
          />
          <button className="btn bg-main text-white ms-5">
            Share App Link
          </button>
        </div>
      </footer>
    </>
  );
}
