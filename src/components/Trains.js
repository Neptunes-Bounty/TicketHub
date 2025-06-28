import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Trains() {
  const navigate = useNavigate();

  const trains = [
    {
      id: 'rajdhani-exp',
      name: 'Rajdhani Express',
      from: 'Mumbai',
      to: 'Delhi',
      date: 'July 1, 2025',
      price: 1500,
      departureTime: '16:00',
      arrivalTime: '10:00'
    },
    {
      id: 'shatabdi-exp',
      name: 'Shatabdi Express',
      from: 'Bangalore',
      to: 'Chennai',
      date: 'July 2, 2025',
      price: 1200,
      departureTime: '06:00',
      arrivalTime: '12:30'
    }
  ];

  const handleBooking = (trainId) => {
    navigate(`/booking-train/${trainId}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Train Tickets</h2>
      <Row>
        {trains.map((train) => (
          <Col key={train.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{train.name}</Card.Title>
                <Card.Text>
                  <div>From: {train.from}</div>
                  <div>To: {train.to}</div>
                  <div>Date: {train.date}</div>
                  <div>Departure: {train.departureTime}</div>
                  <div>Arrival: {train.arrivalTime}</div>
                  <div>Price: ₹{train.price}</div>
                </Card.Text>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleBooking(train.id)}
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