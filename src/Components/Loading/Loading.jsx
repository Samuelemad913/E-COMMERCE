import React from "react";
import styles from "./Loading.module.css";
import imgLoader from "../../assets/images/freshcart-logo.svg";
import { ColorRing } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div
        className={`d-flex justify-content-center align-items-center vh-100 position-fixed h-100 w-100 ${styles.loaderWrapper}`}
      >
        <ColorRing
          visible={true}
          height={80}
          width={80}
          ariaLabel="color-ring-loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
        <figure className="text-center">
          <img src={imgLoader} className="w-100" alt="Loader logo" />
        </figure>
      </div>
    </>
  );
}
