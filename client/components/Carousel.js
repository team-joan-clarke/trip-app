import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

function CuteCarousel() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/signup`);
  };

  return (
    <div>
    <Carousel>
      <Carousel.Item className="mb-5 w-100">
        <img
          className="d-block w-100"
          src="seaview.png"
          alt="First slide"
          />
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          <h1>Plan your perfect trip with trippn</h1>
          <Button onClick={handleClick} variant="primary">
            Start Planning
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="nyc.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          <h1>Plan your perfect trip with trippin</h1>
          <Button className="mb-5" onClick={handleClick} variant="primary">
            Start Planning
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="California.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
         <h1>Plan your perfect trip with trippin</h1>
          <Button className="mb-5" onClick={handleClick} variant="primary">
            Start Planning
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
  );
}

export default CuteCarousel;
