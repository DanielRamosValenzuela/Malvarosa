import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import slideCarousel1 from "../../assets/image/slideCarousel1.jpg";
import slideCarousel2 from "../../assets/image/slideCarousel2.jpg";
import slideCarousel3 from "../../assets/image/slideCarousel3.jpg";
import { Loading } from "../lib/Loading";

export const MainCarousel = () => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    setDidMount(true); // para error:Can't perform a React state update on an unmounted component
    return () => setDidMount(false); //didMount will be true in the unmounted state (ver if al final)
  }, []);

  if (!didMount) {
    //The component mounts, then the effect runs and sets didMount to true, then the component unmounts but didMount is never reset
    return <Loading />; //This was a method that I solve an SSR issue in my app thought will go with this case as well. If not promise should be cancelled I guess
  }
  return (
    <div className={"containerCarousel"}>
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
