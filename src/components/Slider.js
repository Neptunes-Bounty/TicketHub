import Carousel from "react-bootstrap/Carousel";
import React from 'react';
import slider1 from '../images/slider1/1.avif';
import slider2 from '../images/slider1/2.avif';
import slider3 from '../images/slider1/3.avif';
import slider4 from '../images/slider1/4.avif';

function Slider() {
  const promotionalSlides = [
    {
      id: 1,
      title: "Barbie",
      imageUrl: slider1,
      description: "In Theaters July 21"
    },
    {
      id: 2,
      title: "Mission: Impossible - Dead Reckoning Part One",
      imageUrl: slider2,
      description: "Get Your Tickets Now"
    },
    {
      id: 3,
      title: "Oppenheimer",
      imageUrl: slider3,
      description: "Coming July 21"
    },
    {
      id: 4,
      title: "The Flash",
      imageUrl: slider4,
      description: "Book Your Tickets Now"
    }
  ];

  return (
    <Carousel fade>
      {promotionalSlides.map((slide) => (
        <Carousel.Item key={slide.id} interval={3000}>
          <div 
            style={{
              height: '500px',
              background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}
          >
            <div className="carousel-caption" style={{ 
              position: 'absolute',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: '100%',
              padding: '20px'
            }}>
              <h3 style={{ 
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                marginBottom: '1rem'
              }}>{slide.title}</h3>
              <p style={{
                fontSize: '1.25rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>{slide.description}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;