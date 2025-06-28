import "../bookticket.css";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Image1 from "../images/movies_screen/screen.png";
import gsap from "gsap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from './Toast';
import { useWallet } from '../context/WalletContext';
import { Button, Modal } from 'react-bootstrap';

const api = axios.create({
  baseURL: 'https://book-my-show-back-end.onrender.com',
  withCredentials: true
});

export default function Bookticket(props) {
  const { id } = useParams();
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { balance, fetchBalance } = useWallet();
  const navigate = useNavigate();
  let tl = gsap.timeline({ ease: "power1.in" });
  let clicked = false;

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const eventId = id.includes('-') ? id.split('-')[1] : id;
        
        let endpoint;
        if (props.type === "concert") {
          endpoint = `https://book-my-show-back-end.onrender.com/concerts/${eventId}`;
        } else if (props.type === "movie") {
          endpoint = `https://book-my-show-back-end.onrender.com/movies/${eventId}`;
        } else if (props.type === "train") {
          endpoint = `https://book-my-show-back-end.onrender.com/trains/${eventId}`;
        }

        if (!endpoint) {
          throw new Error("Invalid event type");
        }

        // Try to get local data first
        const localEventData = findLocalEventData(eventId);
        if (localEventData) {
          setEventDetails(localEventData);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(endpoint);
        if (!response.data) {
          throw new Error("Event not found");
        }

        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        // Try to get local data as fallback
        const localEventData = findLocalEventData(id);
        if (localEventData) {
          setEventDetails(localEventData);
        } else {
          setError("Unable to load event details. Please try again later.");
          showNotification("Error loading event details. Please try again.", "error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id, props.type]);

  // Helper function to find event data locally
  const findLocalEventData = (eventId) => {
    const movies = [
      {
        id: "1",
        title: "The Flash",
        genre: "Action/Adventure",
        releaseDate: "June 16, 2025",
      },
      {
        id: "2",
        title: "Spider-Man: Across the Spider-Verse",
        genre: "Animation/Action",
        releaseDate: "June 2, 2025",
      },
      {
        id: "3",
        title: "Transformers: Rise of the Beasts",
        genre: "Action/Sci-Fi",
        releaseDate: "June 9, 2025",
      },
      {
        id: "4",
        title: "Elemental",
        genre: "Animation/Family",
        releaseDate: "June 16, 2025",
      },
      {
        id: "5",
        title: "Mission: Impossible - Dead Reckoning Part One",
        genre: "Action/Adventure",
        releaseDate: "July 14, 2025",
      },
      {
        id: "6",
        title: "Oppenheimer",
        genre: "Biography/Drama",
        releaseDate: "July 21, 2025",
      },
      {
        id: "7",
        title: "Barbie",
        genre: "Comedy/Adventure",
        releaseDate: "July 21, 2025",
      },
      {
        id: "8",
        title: "Insidious: The Red Door",
        genre: "Horror/Thriller",
        releaseDate: "July 7, 2025",
      },
      {
        id: "9",
        title: "Indiana Jones and the Dial of Destiny",
        genre: "Action/Adventure",
        releaseDate: "June 30, 2025",
      },
      {
        id: "10",
        title: "Blue Beetle",
        genre: "Action/Sci-Fi",
        releaseDate: "August 18, 2025",
      }
    ];

    // Clean the event ID (remove 'booking-' prefix if present)
    const cleanId = eventId.replace('booking-', '');
    return movies.find(movie => movie.id === cleanId);
  };

  // Get ticket price based on event type
  const getTicketPrice = () => {
    switch (props.type) {
      case "concert":
        return 500;
      case "train":
        return 200;
      default:
        return 150; // movie ticket price
    }
  };

  const showNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  function changecolor(e) {
    if (e.target.className !== "row") {
      if (e.target.style.background !== "green") {
        e.target.style.background = "green";
        setCount(count + 1);
        setPrice(price + getTicketPrice());
      } else {
        e.target.style.background = "#01163E";
        setCount(count - 1);
        setPrice(price - getTicketPrice());
      }
    }
  }

  const handleBooking = async () => {
    setIsProcessing(true);
    try {
      // First check if user is logged in
      const loginCheck = await api.post('/check');
      if (loginCheck.data === "Login/SignUp") {
        showNotification("Please login to book tickets", "error");
        setShowConfirmation(false);
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      // Create booking
      const bookingData = {
        type: props.type || "movie",
        eventId: id.includes('-') ? id.split('-')[1] : id,
        title: eventDetails?.title || props.name,
        price: price,
        seats: count,
        date: new Date().toISOString(),
        username: loginCheck.data
      };

      // Create booking
      await api.post('/booking', bookingData);

      // Deduct from wallet
      await api.post('/wallet/deduct', {
        amount: price,
        description: `Booked ${count} tickets for ${eventDetails?.title || props.name}`
      });

      // Refresh wallet balance
      await fetchBalance();

      showNotification("Booking successful!", "success");
      setShowConfirmation(false);

      setTimeout(() => {
        navigate("/mybookings");
      }, 2000);
    } catch (error) {
      console.error("Error during booking:", error);
      let errorMessage = "Booking failed. Please try again.";
      
      if (error.response?.status === 401) {
        errorMessage = "Please login to book tickets";
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || "Invalid booking data";
      } else if (error.response?.status === 403) {
        errorMessage = "Insufficient wallet balance";
      }
      
      showNotification(errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBookClick = () => {
    if (count === 0) {
      showNotification("Please select at least one seat", "warning");
      return;
    }

    if (price > balance) {
      showNotification("Insufficient wallet balance", "error");
      return;
    }

    setShowConfirmation(true);
  };

  return (
    <body1>
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      {/* Booking Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => !isProcessing && setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{eventDetails?.title}</h5>
          <div className="mb-3">
            <p className="mb-1">Selected Seats: {count}</p>
            <p className="mb-1">Total Price: ₹{price}</p>
            <p className="mb-1">Wallet Balance: ₹{balance}</p>
            <p className="mb-1">Balance after booking: ₹{balance - price}</p>
          </div>
          <p>Are you sure you want to proceed with the booking?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowConfirmation(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleBooking}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ul className="showcase">
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="movie-screen">
          <img src={Image1} alt="screen" />
        </div>

        {eventDetails && (
          <h3 className="text-center mb-4">{eventDetails.title}</h3>
        )}

        <div className="row-container">
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat "></div>
            <div className="seat "></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat "></div>
            <div className="seat "></div>
          </div>
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat "></div>
            <div className="seat "></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div onClick={changecolor} className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat "></div>
            <div className="seat "></div>
            <div className="seat "></div>
            <div className="seat"></div>
          </div>
          <h5 className="subtitle">₹{getTicketPrice()}</h5>

          <div className="text-wrapper">
            <p className="text">
              Selected Seats <span id="count">{count}</span>
            </p>
            <p className="text">
              Total Price ₹<span id="total">{price}</span>
            </p>
            <p className="text">
              Wallet Balance ₹<span id="balance">{balance}</span>
            </p>

            <body2>
              <div onClick={handleBookClick} id="button" className="book-button">
                <span id="text">Book</span>
              </div>
            </body2>
          </div>
        </div>
      </div>
    </body1>
  );
}