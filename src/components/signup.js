import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from './Toast';

export default function SignUp() {
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [city, setcity] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  let navigate = useNavigate();

  const showNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const validateForm = () => {
    if (!username || !password || !email || !name || !city || !number) {
      showNotification("Please fill in all fields", "warning");
      return false;
    }
    if (password.length < 6) {
      showNotification("Password must be at least 6 characters long", "warning");
      return false;
    }
    if (!/^\d{10}$/.test(number)) {
      showNotification("Please enter a valid 10-digit phone number", "warning");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification("Please enter a valid email address", "warning");
      return false;
    }
    return true;
  };

  async function submit(e) {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("https://book-my-show-back-end.onrender.com/user", {
        name,
        password,
        email,
        city,
        number,
        username,
        walletBalance: 5000
      });

      showNotification("Account created successfully! Welcome bonus: ₹5000", "success");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response?.data?.message) {
        showNotification(error.response.data.message, "error");
      } else {
        showNotification("Failed to create account. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="signup-container" style={{ margin: "40px auto", maxWidth: "800px", padding: "20px" }}>
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      <h2 className="mb-4">Create Your TicketHub Account</h2>
      <p className="text-muted mb-4">Get ₹5000 welcome bonus in your wallet upon signup!</p>

      <Form onSubmit={submit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="Your city"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="10-digit mobile number"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="px-4"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}