import Nav from "react-bootstrap/Nav";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import React from "react";
import Login from "./loginsignup";
import axios from "axios";
import styles from './Navigation.module.css';
import { useWallet } from '../context/WalletContext';

function Navigation() {
  const [login, setLogin] = useState("Login/SignUp");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { balance, fetchBalance } = useWallet();
  const [showWalletPopup, setShowWalletPopup] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.post("https://book-my-show-back-end.onrender.com/check");
      setLogin(response.data);
      setIsLoggedIn(response.data !== "Login/SignUp");
      if (response.data !== "Login/SignUp") {
        fetchBalance();
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://book-my-show-back-end.onrender.com/logout");
      setLogin("Login/SignUp");
      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleWalletClick = (e) => {
    e.preventDefault();
    setShowWalletPopup(true);
  };

  return (
    <div className="bg-dark">
      <Container className="py-2">
        <Row className="align-items-center">
          <Col>
            <Nav className="justify-content-center">
              <Nav.Item>
                <Nav.Link href="/movies" className={styles.navLink}>Movies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/concerts" className={styles.navLink}>Concerts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/trains" className={styles.navLink}>Train Tickets</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            {isLoggedIn ? (
              <>
                <div className={styles.userInfo}>
                  <i className="bi bi-person-circle me-2"></i>
                  <span className="fw-bold">{login}</span>
                </div>
                <Nav.Link 
                  href="/wallet" 
                  className={`${styles.walletLink} ${balance < 1000 ? styles.walletLinkLow : ''}`}
                  onClick={handleWalletClick}
                >
                  <i className="bi bi-wallet2 me-2"></i>
                  <span className="fw-bold">₹{balance?.toLocaleString('en-IN')}</span>
                </Nav.Link>
                
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-light" id="user-dropdown" className={styles.userDropdown}>
                    <i className="bi bi-gear me-2"></i>
                    Menu
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/mybookings" className={styles.dropdownItem}>
                      <i className="bi bi-ticket-perforated me-2"></i>My Bookings
                    </Dropdown.Item>
                    <Dropdown.Item href="/wallet" className={styles.dropdownItem}>
                      <i className="bi bi-wallet2 me-2"></i>Wallet
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className={styles.dropdownItem}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Popup
                trigger={
                  <Button variant="outline-light" className={styles.loginButton}>
                    <i className="bi bi-person-circle me-2"></i>
                    Login/SignUp
                  </Button>
                }
                modal
                nested
                closeOnDocumentClick
              >
                <div>
                  <Login onLoginSuccess={checkLoginStatus} />
                </div>
              </Popup>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Navigation;