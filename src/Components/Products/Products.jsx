import React, { useContext, } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  let {
    addToCart,
    addToWishList,
    setWishCount,
    setNumOfCartItems,
  } = useContext(CartContext);


  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("products", getProducts);

  if (isLoading) return <Loading />;

  async function addCart(id) {
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success(data.message);
      setNumOfCartItems(data?.numOfCartItems);
    } else {
      toast.error(data?.message);
    }
  }

  async function addWish(id) {
    let { data } = await addToWishList(id);

    if (data?.status === "success") {
      toast.success(data.message);
      setWishCount(data?.data?.length);
    } else {
      toast.error(data?.message);
    }
  }



  return (
    <>
      <Helmet>
        <title>Ecommerce | Products</title>
      </Helmet>
      <section className="py-5 my-5">
        <div className="container">
          <div className="row g-2">
            {data?.data?.data &&
              data?.data?.data.map((item) => (
                <div className="col-md-3" key={item._id}>
                  <div className="card h-100 w-100 p-2 rounded cursor-pointer product">
                    <Link to={"/productdetails/" + item._id}>
                      <div>
                        <img
                          src={item.imageCover}
                          className="w-100 rounded-2 pb-1"
                          alt="product item"
                        />
                        <h5 className="text-main my-1">{item.category.name}</h5>
                        <h4 className="fw-bold my-2 text-center'">
                          {item.title.split(" ").slice(0, 2).join(" ")}
                        </h4>
                        <div className="d-flex align-items-center my-3 justify-content-between px-4">
                          <span className="fw-bold">{item.price} EGP</span>
                          <span className="fw-bold h4">
                            <i className=" rating-color fa-solid fa-star"></i>
                            {item.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="d-flex justify-content-around align-items-center pb-2">
                      <button
                        onClick={() => addCart(item._id)}
                        className="btn bg-main px-5 text-white"
                      >
                        Add to Cart
                      </button>
                      <button onClick={() => addWish(item._id)} className="btn">
                        <i className="fa-solid fa-heart fa-2xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
