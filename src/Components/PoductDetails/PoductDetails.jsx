import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
export default function PoductDetails() {
  let x = useParams();
  const [productdetails, setProductdetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { addToCart, addToWishList, setNumOfCartItems, setWishCount } =
    useContext(CartContext);

  async function getProductDeatails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
    );
    setProductdetails(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDeatails();
  }, []);

  if (isLoading) return <Loading />;

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  async function addCart(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
      setNumOfCartItems(data?.numOfCartItems);
    } else {
      toast.error(data.message);
    }
  }

  async function addWish(id) {
    let { data } = await addToWishList(id);
    if (data.status === "success") {
      toast.success(data.message);
      setWishCount(data?.data?.length);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <>
      {" "}
      <Helmet>
        <title>Ecommerce | Product Details</title>
      </Helmet>
      <section className="my-5">
        <div className="container p-2">
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card rounded-4 p-4">
                <Slider {...settings}>
                  {productdetails.images.map((item) => {
                    return (
                      <img
                        src={item}
                        key={productdetails.id}
                        className="w-100"
                        alt="Product"
                      />
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="col-md-8">
              <h2 className="fw-bold py-5 text-center">
                {productdetails.title}
              </h2>
              <p className="text-center h5">{productdetails.description}</p>
              <span className="pt-3">{productdetails.category.name}</span>
              <div className="d-flex align-items-center py-4 my-3 justify-content-between px-4">
                <span className="fw-bold h3">{productdetails.price} EGP</span>
                <span className="fw-bold h3">
                  <i className=" rating-color fa-solid fa-star"></i>
                  {productdetails.ratingsAverage}
                </span>
              </div>
              <div className="d-flex justify-content-around align-items-center pb-2 py-4">
                <button
                  className="btn bg-main px-5 text-white w-75"
                  onClick={() => addCart(productdetails._id)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn"
                  onClick={() => addWish(productdetails._id)}
                >
                  <i className="fa-solid fa-heart fa-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
