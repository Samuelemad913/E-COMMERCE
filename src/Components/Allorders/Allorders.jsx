import React from "react";
import { Link } from "react-router-dom";
export default function Allorders() {
  return (
    <>
      <section>
        <div className="container my-5 py-5">
          <div className="bg-success p-5">
            <h2 className="text-center text-white fw-bold">Successfully</h2>
          </div>
          <Link className="btn btn-outline-success m-2 p-2 px-5 w-100" to={"/home"}>Back to home page!!</Link>
        </div>
      </section>
    </>
  );
}
