import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import Loading from "./../Loading/Loading";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  let {
    getUserCart,
    deleteCartItem,
    updateCount,
    setNumOfCartItems,
    clearCart,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState({});

  async function getCart() {
    let { data } = await getUserCart();
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems);
  }

  async function removeItem(id) {
    let { data } = await deleteCartItem(id);
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems);
    if (data?.numOfCartItems === undefined) {
      setNumOfCartItems(0);
    }
  }

  async function clearCartData() {
    let { data } = await clearCart();
    setCartDetails(null);
    setNumOfCartItems(0);
    if (data?.message === "success") {
      toast.success(data?.message);
    }
  }

  async function updateItemCount(id, count) {
    let { data } = await updateCount(id, count);
    data?.data?.products.map((item) => {
      if (item.count === 0) {
        removeItem(item.product._id);
      }
    });
    setCartDetails(data);
  }

  
  useEffect(() => {
    getCart();
  }, []);

  if (
    !cartDetails?.data?.products ||
    cartDetails?.data?.products?.length === 0
  ) {
    return (  
      <>
        <div className="container">
          <h1 className="text-center py-5 my-5 fw-bold">Empty Cart </h1>
          <Link className="btn btn-success w-100 fw-bold" to={"/home"}>
            Shop Now
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Ecommerce | Shopping Cart</title>
      </Helmet>
      {cartDetails?.data ? (
        <section className="py-5">
          <div className="container bg-main-light p-4">
            <h2 className="fw-bold text-center">Shopping Cart</h2>
            <div className="d-flex align-items-center justify-content-between py-2">
              <p className="text-main h5">
                Total Price: {cartDetails.data.totalCartPrice}
              </p>
              <button
                onClick={clearCartData}
                className="btn btn-outline-danger"
              >
                <i className="fa-solid fa-trash pe-1"></i>Clear Cart
              </button>
            </div>
            {cartDetails.data.products.map((item) => {
              return (
                <div
                  className="row py-3 my-2 border-bottom border-3"
                  key={item.product._id}
                >
                  <div className="col-md-1">
                    <img
                      src={item.product.imageCover}
                      alt="Cart item"
                      className="w-100"
                    />
                  </div>
                  <div className="col-md">
                    <div className="d-flex justify-content-between align-items-center py-4">
                      <div>
                        <h5>{item.product.title}</h5>
                        <p className="text-main h5 py-1">Price: {item.price}</p>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeItem(item.product._id)}
                        >
                          <i className="fa-solid fa-trash-can pe-1"></i>
                          Delete
                        </button>
                      </div>
                      <div className="fw-bold">
                        <span
                          className=" btn btn-outline-success"
                          onClick={() =>
                            updateItemCount(item.product._id, item.count + 1)
                          }
                        >
                          +
                        </span>
                        <span className="  mx-3 btn-outline-info  text-black">
                          {item.count}
                        </span>
                        <span
                          className=" btn btn-outline-success "
                          onClick={() =>
                            updateItemCount(item.product._id, item.count - 1)
                          }
                        >
                          -
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              to={"/checkout"}
              className="btn bg-main text-white w-100 py-2 my-3"
            >
              Check Out
            </Link>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
