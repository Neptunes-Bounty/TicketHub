import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import axios from 'axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user's bookings when component mounts
    axios.get('https://book-my-show-back-end.onrender.com/mybookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case 'movie':
        return 'primary';
      case 'concert':
        return 'success';
      case 'train':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <h4>No bookings found</h4>
          <p>Your booked tickets will appear here</p>
        </div>
      ) : (
        <Table responsive hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Title/Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <Badge bg={getTypeColor(booking.type)}>
                    {booking.type.toUpperCase()}
                  </Badge>
                </td>
                <td>{booking.title}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>{booking.seats.join(', ')}</td>
                <td>₹{booking.amount}</td>
                <td>
                  <Badge bg={booking.status === 'confirmed' ? 'success' : 'info'}>
                    {booking.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}