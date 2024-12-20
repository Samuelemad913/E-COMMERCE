import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/slide1.avif";
import slide2 from "../../assets/images/slide2.avif";
import slide3 from "../../assets/images/slide3.avif";
import slide4 from "../../assets/images/slide4.avif";
import slide5 from "../../assets/images/slide5.avif";
import slide6 from "../../assets/images/slide6.avif";
import slide7 from "../../assets/images/slide7.avif";


export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings} className="pt-5 px-2 mb-1 my-5">
        <img src={slide1} alt="Slider-Cover" />
        <img src={slide2} alt="Slider-Cover" />
        <img src={slide3} alt="Slider-Cover" />
        <img src={slide4} alt="Slider-Cover" />
        <img src={slide5} alt="Slider-Cover" />
        <img src={slide6} alt="Slider-Cover" />
        <img src={slide7} alt="Slider-Cover" />

      </Slider>
    </>
  );
}
