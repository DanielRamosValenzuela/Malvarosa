import React from "react";

import slideCarousel1 from "../../assets/image/slideCarousel1.jpg";
import slideCarousel2 from "../../assets/image/slideCarousel2.jpg";
import slideCarousel3 from "../../assets/image/slideCarousel3.jpg";
import { Carousel } from "react-bootstrap";

export const MainCarousel = () => {
  return (
    <div className="containerCarousel">
      <Carousel fade>
        <Carousel.Item className="slide-carousel">
          <img src={slideCarousel1} alt="First slide" />
          <Carousel.Caption className="carouselCaption">
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slide-carousel">
          <img src={slideCarousel2} alt="Second slide" />

          <Carousel.Caption className="carouselCaption">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slide-carousel">
          <img src={slideCarousel3} alt="Third slide" />

          <Carousel.Caption className="carouselCaption">
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
