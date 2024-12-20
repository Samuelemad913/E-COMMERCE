import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
export default function Categories() {
  function getCatagories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("Categories", getCatagories);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Ecommerce | Categories</title>
      </Helmet>
      <section className="py-5 my-5">
        <div className="container">
          <div className="row g-3">
            {data?.data?.data &&
              data?.data?.data.map((item) => (
                <div className="col-md-4">
                  <div
                    className="card rounded-3 text-center product cursor-pointer"
                    key={item._id}
                  >
                    <img
                      src={item.image}
                      height={400}
                      alt="Category item"
                      className="w-100 rounded-3"
                    />
                    <h2 className="py-3 fw-bold text-main">{item.name}</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
