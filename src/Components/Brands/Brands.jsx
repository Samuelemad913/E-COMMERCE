import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
export default function Brands() {


  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery("brands", getBrands);

  console.log(data);

  if (isLoading) return <Loading />;


  return (
    <>
      <section className="py-5 my-5">
        <Helmet>
          <title>Ecommerce | Brands</title>
        </Helmet>
        <h2 className="fw-bold text-center text-main h1">All Brands</h2>
        <div className="container">
          <div className="row g-3">
            {data?.data?.data &&
              data?.data?.data.map((item) => (
                <div className="col-md-4">
                  <div className="card text-center product cursor-pointer">
                    <img
                      src={item.image}
                      key={item._id}
                      alt="Category item"
                      className="w-100"
                    />
                    <h3 className="py-3">{item.name}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
