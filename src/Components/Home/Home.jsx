import React from "react";
import MainSlider from "./../MainSlider/MainSlider";
import CatagoriesSlider from "./../CatagoriesSlider/CatagoriesSlider";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <> 
      <Helmet>
        <title>Ecommerce | Home Page</title>
      </Helmet>
      <MainSlider />
      <CatagoriesSlider />
      <Products />
    </>
  );
}
