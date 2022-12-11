import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import React from "react";
import About from "./About";

function CuteCarousel() {

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
          <h1 className="fontForCarousel" style={{margin: '1.5rem'}}>Plan your perfect trip with trippn</h1>
          <Button className="marginBottom" href='/signup' variant="success">
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
          <h1 className="fontForCarousel" style={{margin: '1.5rem'}}>Plan your perfect trip with trippn</h1>
          <Button className="marginBottom" href='/signup' variant="success">
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
         <h1 className="fontForCarousel" style={{margin: '1.5rem'}}>Plan your perfect trip with trippn</h1>
          <Button className="marginBottom" href='/signup' variant="success">
            Start Planning
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <About />
  </div>
  );
}

export default CuteCarousel;
