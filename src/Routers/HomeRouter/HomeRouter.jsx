import React, { useState } from "react";
import NavBar from "../../components/global/NavBar/NavBar";
import { Row, Col, Container, Offcanvas } from "react-bootstrap";
import ProductsList from "../../components/ProductsList/ProductsList";
import Cart from "../../components/Cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import queryHooks from "../../components/hooks/queryHooks";
import "./HomeRouter.scss";

const HomeRouter = () => {
  const [showCart, setShowCart] = useState(false);
  const { data, isSuccess } = queryHooks.useGetBasket();

  return (
    <section className="HomeRouter position-relative">
      <NavBar />

      <Container fluid>
        <Row>
          <Col
            className="d-flex justify-content-center align-items-center p-0"
            xs={12}
            sm={7}
            xl={9}
          >
            <ProductsList />
          </Col>

          <Col xs={0} sm={5} xl={3}>
            <Cart />
          </Col>
        </Row>
      </Container>

      <div
        className="ShoppingCart position-absolute"
        onClick={() => setShowCart(true)}
      >
        <div className="ShoppingCart-number">
          {isSuccess
            ? data.items.reduce((prev, cur) => prev + cur.count, 0)
            : 0}
        </div>
        <FontAwesomeIcon className="ShoppingCart-icon" icon={faShoppingCart} />
      </div>
      <Offcanvas
        className="HomeRouter-offcanvas"
        show={showCart}
        onHide={() => setShowCart(false)}
        placement="bottom"
        dir="rtl"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Cart className="ali" />
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
};

export default HomeRouter;
