import React, { useState } from 'react';
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Navbar1() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <Navbar bg="dark" variant="dark" className="py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <svg width="32" height="32" className="me-2" viewBox="0 0 24 24" style={{ color: '#dc3545' }}>
            <path
              fill="currentColor"
              d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H20V18M18,12L14,16H10L6,12L10,8H14L18,12M14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12Z"
            />
          </svg>
          <span className="fw-bold text-white">TicketHub</span>
        </Navbar.Brand>

        <Form className="d-flex mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search movies, concerts, trains..."
            className="me-2 bg-dark text-white border-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
            style={{
              '::placeholder': { color: 'rgba(255,255,255,0.5)' }
            }}
          />
          <Button variant="outline-danger">
            <i className="bi bi-search"></i>
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Navbar1;