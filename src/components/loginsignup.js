import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useWallet } from '../context/WalletContext';

export default function Login({ onLoginSuccess }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [afterlogin, setafterlogin] = useState("");
  const [error, setError] = useState("");
  const { balance, fetchBalance } = useWallet();

  function username1(e) {
    setusername(e.target.value);
  }

  function password1(e) {
    setpassword(e.target.value);
  }

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://book-my-show-back-end.onrender.com/login",
        {
          username: username,
          password: password,
        }
      );

      setafterlogin(response.data);

      if (response.data !== "Invalid Username or Password") {
        // Fetch wallet balance after successful login
        await fetchBalance();
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  }

  return (
    <Form
      style={{
        width: "700px",
        margin: "auto auto",
        backgroundColor: "#1a1a1a",
        padding: "50px 50px 50px 50px",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h3 className="mb-4">Welcome to TicketHub</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person"></i>
          </span>
          <Form.Control
            onChange={username1}
            type="text"
            placeholder="Enter Username"
            value={username}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-lock"></i>
          </span>
          <Form.Control
            onChange={password1}
            type="password"
            placeholder="Password"
            value={password}
          />
        </div>
      </Form.Group>

      <div className="d-flex align-items-center justify-content-between">
        <Button variant="primary" type="submit" onClick={submit}>
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Login
        </Button>

        <Link to="/signup">
          <Button variant="outline-light">
            <i className="bi bi-person-plus me-2"></i>
            Create Account
          </Button>
        </Link>
      </div>

      {afterlogin && afterlogin !== "Invalid Username or Password" && (
        <div className="alert alert-success mt-4" role="alert">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <i className="bi bi-check-circle-fill me-2"></i>
              Welcome back, {afterlogin}!
            </div>
            <div className="badge bg-success fs-6">
              <i className="bi bi-wallet2 me-1"></i>
              Balance: ₹{balance?.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      )}
    </Form>
  );
}