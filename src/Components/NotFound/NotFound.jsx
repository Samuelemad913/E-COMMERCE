import React from "react";
import notFound from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>Ecommerce | Not Found</title>
    </Helmet>
      <section className="mx-auto text-center py-5">
        <img className="w-50" src={notFound} alt="" />
      </section>
    </>
  );
}
