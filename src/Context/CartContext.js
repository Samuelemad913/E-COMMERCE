import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();


export default function CartContextProvider(props) {


  let headers = {
    token: localStorage.getItem("token")
  }



  function addToCart(id) {

    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: id
    }, { headers }).then((res) =>
      res).catch((err) => err)
  }


  function getUserCart() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then((res) =>
      res).catch((err) => err)
  }

  function deleteCartItem(id) {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers }).then((res) =>
      res).catch((err) => err)
  }

  function clearCart() {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((res) =>
      res).catch((err) => err)
  }



  function updateCount(id, count) {

    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count
    }, { headers }).then((res) =>
      res).catch((err) => err)
  }

  function addToWishList(id) {

    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
      productId: id
    }, { headers }).then((res) =>
      res).catch((err) => err)
  }


  function getUserwishList() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers }).then((res) =>
      res).catch((err) => err)

  }

  function deleteWishItem(id) {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers }).then((res) =>
      res).catch((err) => err)
  }

  const [cartId, setCartId] = useState(null)

  const [numOfCartItems, setNumOfCartItems] = useState(null)
  const [wishCount, setWishCount] = useState(null)



  async function getInistialCart() {
    let { data } = await getUserCart()
    setNumOfCartItems(data?.numOfCartItems)
    setCartId(data?.data?._id)
  }

  useEffect(() => {
    getInistialCart()
  }, [])



  function onlinePayment(shippingAddress) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
      shippingAddress
    }, { headers })
      .then((res) =>
        res).catch((err) => err)

  }

  async function getUserwishListt() {
    let { data } = await getUserwishList()
    setWishCount(data?.count)

  }


  useEffect(() => {
    getUserwishListt()
  }, [])

  return <CartContext.Provider value={{ addToCart, getUserCart, numOfCartItems, setNumOfCartItems, deleteCartItem, clearCart, updateCount, onlinePayment, addToWishList, deleteWishItem, getUserwishList, wishCount, setWishCount }}>
    {props.children}
  </CartContext.Provider>
}