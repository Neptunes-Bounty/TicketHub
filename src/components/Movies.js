import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import movie1 from '../images/Movies/1.avif';
import movie2 from '../images/Movies/2.avif';
import movie3 from '../images/Movies/3.avif';
import movie4 from '../images/Movies/4.avif';
import movie5 from '../images/Movies/5.avif';
import movie6 from '../images/Movies/6.avif';
import movie7 from '../images/Movies/7.avif';
import movie8 from '../images/Movies/8.avif';
import movie9 from '../images/Movies/9.avif';
import movie10 from '../images/Movies/10.avif';

function Movies() {
  const movies = [
    {
      id: "1",
      title: "The Flash",
      image: movie1,
      genre: "Action/Adventure",
      releaseDate: "June 16, 2025",
    },
    {
      id: "2",
      title: "Spider-Man: Across the Spider-Verse",
      image: movie2,
      genre: "Animation/Action",
      releaseDate: "June 2, 2025",
    },
    {
      id: "3",
      title: "Transformers: Rise of the Beasts",
      image: movie3,
      genre: "Action/Sci-Fi",
      releaseDate: "June 9, 2025",
    },
    {
      id: "4",
      title: "Elemental",
      image: movie4,
      genre: "Animation/Family",
      releaseDate: "June 16, 2025",
    },
    {
      id: "5",
      title: "Mission: Impossible - Dead Reckoning Part One",
      image: movie5,
      genre: "Action/Adventure",
      releaseDate: "July 14, 2025",
    },
    {
      id: "6",
      title: "Oppenheimer",
      image: movie6,
      genre: "Biography/Drama",
      releaseDate: "July 21, 2025",
    },
    {
      id: "7",
      title: "Barbie",
      image: movie7,
      genre: "Comedy/Adventure",
      releaseDate: "July 21, 2025",
    },
    {
      id: "8",
      title: "Insidious: The Red Door",
      image: movie8,
      genre: "Horror/Thriller",
      releaseDate: "July 7, 2025",
    },
    {
      id: "9",
      title: "Indiana Jones and the Dial of Destiny",
      image: movie9,
      genre: "Action/Adventure",
      releaseDate: "June 30, 2025",
    },
    {
      id: "10",
      title: "Blue Beetle",
      image: movie10,
      genre: "Action/Sci-Fi",
      releaseDate: "August 18, 2025",
    }
  ];

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={movie.image}
                style={{ height: "300px", objectFit: "cover" }}
                alt={movie.title}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <div>{movie.genre}</div>
                  <div>Release: {movie.releaseDate}</div>
                </Card.Text>
                <Link to={`/booking-${movie.id}`} className="mt-auto">
                  <Button variant="danger" className="w-100">
                    Book Now
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Movies;