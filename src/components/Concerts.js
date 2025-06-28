import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Concerts() {
  const navigate = useNavigate();

  const concerts = [
    {
      id: 'arijit-singh',
      name: 'Arijit Singh Live in Concert',
      venue: 'DY Patil Stadium, Mumbai',
      date: 'July 15, 2025',
      price: 2500,
      image: 'https://static.toiimg.com/thumb/msid-99260445,width-1280,height-720,resizemode-4/.jpg',
      description: 'Experience the magic of Bollywood\'s most beloved voice'
    },
    {
      id: 'ed-sheeran',
      name: 'Ed Sheeran Mathematics Tour',
      venue: 'Jawaharlal Nehru Stadium, Delhi',
      date: 'August 5, 2025',
      price: 3000,
      image: 'https://www.nme.com/wp-content/uploads/2023/03/Ed-Sheeran-Mathematics-Tour.jpg',
      description: 'Global superstar returns to India'
    }
  ];

  const handleBooking = (concertId) => {
    navigate(`/booking-concert/${concertId}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Upcoming Concerts</h2>
      <Row>
        {concerts.map((concert) => (
          <Col key={concert.id} md={6} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Img 
                variant="top" 
                src={concert.image} 
                style={{ height: '300px', objectFit: 'cover' }}
                alt={concert.name}
              />
              <Card.Body>
                <Card.Title className="h4">{concert.name}</Card.Title>
                <Card.Text>
                  <p className="text-muted mb-2">{concert.description}</p>
                  <div><strong>Venue:</strong> {concert.venue}</div>
                  <div><strong>Date:</strong> {concert.date}</div>
                  <div><strong>Price:</strong> ₹{concert.price.toLocaleString('en-IN')}</div>
                </Card.Text>
                <button 
                  className="btn btn-danger w-100" 
                  onClick={() => handleBooking(concert.id)}
                >
                  Book Now
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}