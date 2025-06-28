import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar1 from "./components/Navbar";
import Navigation from "./components/Navigation";
import Slider from "./components/Slider";
import Bookticket from "./components/Bookticket";
import Movies from "./components/Movies";
import Concerts from "./components/Concerts";
import Trains from "./components/Trains";
import MyBookings from "./components/MyBookings";
import Wallet from "./components/Wallet";
import SignUp from "./components/signup";
import BreadcrumbNav from "./components/Breadcrumb";
import { WalletProvider } from "./context/WalletContext";
import React from 'react';
import { Routes, Route } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Navbar1 />
      <Navigation />
      <BreadcrumbNav />
      {children}
    </>
  );
}

function App() {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Slider />
            <Movies />
          </Layout>
        }/>
        <Route path="/movies" element={<Layout><Movies /></Layout>} />
        <Route path="/concerts" element={<Layout><Concerts /></Layout>} />
        <Route path="/trains" element={<Layout><Trains /></Layout>} />
        <Route path="/mybookings" element={<Layout><MyBookings /></Layout>} />
        <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/booking-:id" element={<Layout><Bookticket type="movie" /></Layout>} />
        <Route path="/booking-concert/:id" element={<Layout><Bookticket type="concert" /></Layout>} />
        <Route path="/booking-train/:id" element={<Layout><Bookticket type="train" /></Layout>} />
        <Route path="/bookingblack" element={<Layout><Bookticket name="black"/></Layout>} />
        <Route path="/bookingbhediya" element={<Layout><Bookticket name="bhediya" /></Layout>} />
      </Routes>
    </WalletProvider>
  );
}

export default App;