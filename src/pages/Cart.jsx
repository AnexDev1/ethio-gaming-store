// Cart.jsx

import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import Chapa from "chapa";

const myChapa = new Chapa("CHASECK_TEST-PQAmj6LtxUNhO1kb1KoPO6XoOzjafPo1"); // Replace with your actual key

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  const handleCheckout = async () => {
    // Calculate total amount and other required payment data
    const totalPrice = cartList.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
    const currency = "ETB"; // Replace with your actual currency
    const phone_number = "0912345678"; // Replace with a valid phone number

    // Generate a unique transaction reference (use a secure library in production)
    const txRef = Math.random().toString(36).substring(2, 15);

    const paymentData = {
      amount: totalPrice.toString(),
      first_name: "anwar",
      last_name: "dev",
      currency,
      phone_number,
      email: "test@gmail.com",
      tx_ref: txRef,
      callback_url: "https://your-backend-callback-url", // Replace with your backend callback URL
      return_url: "http://localhost:5173", // Replace with your success page URL
      customization: {
        title: "Payment for my favorite merchant",
        description: "I love online payments",
      },
    };

    try {
      const response = await myChapa.initialize(paymentData);

      if (response.status === "success") {
        window.location.assign(response.data.checkout_url); // Redirect to Chapa checkout
      } else {
        console.error("Payment initialization failed:", response.message);
        // Handle payment failure appropriately (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error("Payment error:", error);
      // Handle generic error
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            {item.price}.00 * {item.qty} Birr
                            <span>{productQty}.00 Birr</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-add"> </i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"> </i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>{totalPrice}.00 Birr</h3>
              </div>
            </div>
            {totalPrice > 1 && (
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                style={{
                  backgroundColor: "#13427B",
                  color: "#fff",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "center",
                  marginLeft: "1rem",
                }}
              >
                Checkout
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
