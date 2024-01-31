import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <ion-icon name="bag"></ion-icon>
              <h1>Ethio Gamers Store</h1>
            </div>
            <p>
              Welcome to Ethio Gaming Store, your one-stop destination for all
              your in-game top-up needs. With a strong track record of serving
              customers for the past year, we take pride in offering fast,
              reliable, and secure services at affordable prices.
            </p>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Products</h2>
            <ul>
              <li>Accessories</li>
              <li>Games</li>
              <li>Top up</li>
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>Addis Ababa, Ethiopia</li>
              <li>Email: ethiogamingstore@gmail.com</li>
              <li>Phone: +251-987-79-64-55</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
