import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
export default function WishList() {
  const {
    getUserwishList,
    addToCart,
    deleteWishItem,
    setWishCount,
    setNumOfCartItems,
  } = useContext(CartContext);
  const [WishListDetails, setWishListDetails] = useState({});

  async function getwish() {
    let { data } = await getUserwishList();
    setWishListDetails(data);
    setWishCount(data?.count);
  }

  async function addCart(id) {
    let { data } = await addToCart(id);

    if (data?.status === "success") {
      toast.success(data?.message);
      setNumOfCartItems(data?.numOfCartItems);
    } else {
      toast.error(data?.message);
    }
  }

  async function removeItem(id) {
    let { data } = await deleteWishItem(id);
    setWishListDetails(data);
    setWishCount(data?.data?.length);
    toast.error(data?.message);
    setWishListDetails(data);
  }

  useEffect(() => {
    getwish();
  }, []);

  if (!WishListDetails?.data || WishListDetails?.data?.length === 0) {
    return (
      <>
        <div className="container">
          <h1 className="text-center py-5 my-5 fw-bold"> Wish List is Empty</h1>
          <Link className="btn btn-success w-100 fw-bold" to={"/products"}>
            Click here to See our products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Ecommerce | Wish List</title>
      </Helmet>
      {WishListDetails.data ? (
        <section className="py-5 my-5">
          <div className="container bg-main-light p-4">
            <h1 className="fw-bold text-center">My WishList</h1>
            <div className="d-flex align-items-center justify-content-between py-2"></div>
            {WishListDetails.data?.map((item) => {
              return (
                <div
                  className="row py-3 my-2 border-bottom border-3"
                  key={item.id}
                >
                  <div className="col-md-2">
                    <img
                      src={item.imageCover}
                      alt="Cart item"
                      className="w-100"
                    />
                  </div>
                  <div className="col-md">
                    <div className="d-flex justify-content-between align-items-center py-4">
                      <div>
                        <h5>{item.title}</h5>
                        <p className="text-main h5 py-1">Price: {item.price}</p>
                        <span className="fw-light text-body-tertiary">Product details:</span>
                        <p className="text-secondary h5 py-1">
                          Price: {item.description}
                        </p>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeItem(item._id)}
                        >
                          <i className="fa-solid fa-trash-can pe-1"></i>
                          remove
                        </button>
                      </div>
                      <div className="fw-bold"></div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button
                      onClick={() => addCart(item._id)}
                      className="btn btn-outline-success fw-bold p-2 px-3 w-100"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
