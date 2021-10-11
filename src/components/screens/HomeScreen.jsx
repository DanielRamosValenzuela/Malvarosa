import React from "react";
import { Products } from "../Product/Products";

import { MainCarousel } from "../Carousel/MainCarousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export const HomeScreen = ({ products, onAddToCart }) => {
  return (
    <section>
      <MainCarousel />
      <Products products={products} onAddToCart={onAddToCart} />
    </section>
  );
};
