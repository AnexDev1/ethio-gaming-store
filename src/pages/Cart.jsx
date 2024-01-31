import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  const handleCheckout = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer CHASECK_TEST-PQAmj6LtxUNhO1kb1KoPO6XoOzjafPo1"
    );
    myHeaders.append("Content-Type", "application/json");
    const randomTxRef =
      new Date().getTime() + Math.random().toString(36).substring(2, 15);

    try {
      // Gather payment data from the cart or user input (if needed)
      const paymentData = JSON.stringify({
        amount: `${totalPrice}`,
        currency: "ETB",
        phone_number: "0912345678",
        tx_ref: randomTxRef,
        callback_url:
          "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        return_url:
          "http://localhost/cart" || "https://ethio-gaming-store.vercel.app",
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "I love online payments",
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: paymentData,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api.chapa.co/v1/transaction/initialize",
        requestOptions
      );
      const result = await response.json();

      if (result.status === "success") {
        const checkoutUrl = result.data.checkout_url;
        window.location.href = checkoutUrl;
      } else {
        console.error("Payment error:", result.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
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
                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
