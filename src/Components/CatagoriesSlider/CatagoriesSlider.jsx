import axios from "axios";
import React from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";

export default function CatagoriesSlider() {
  function getCatagories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("Categories", getCatagories);


  if (isLoading) return <Loading />;

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
  };
  if (isLoading) return <Loading />;

  return (
    <>
      <h3 className="text-center py-2 pt-3 fw-bold">
        Popular Shopping Categories
      </h3>
      <Slider {...settings} className="px-2 my-3 container">
        {data?.data?.data &&
          data?.data?.data.map((item) => (
            <img
              src={item.image}
              alt="Categories"
              height={200}
              key={item._id}
              className="px-1"
            />
          ))}
      </Slider>
    </>
  );
}
