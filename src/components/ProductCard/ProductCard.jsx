import React from "react";
import { useState } from "react";
import { Card, Button, Modal, CloseButton } from "react-bootstrap";
import Order from "../order/Order";
import { numberToMoney } from "../../functions/functions";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const handelClickOrder = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="Container">
      <Modal className="Modal" show={showModal} onHide={handleClose}>
        <CloseButton onClick={() => setShowModal(false)} />
        <Order
          properties={product?.productProperties}
          productPrice={product?.price}
          productId={product?.id}
          setShowModal={setShowModal}
        />
      </Modal>
      <Card className="ProductCard d-flex flex-row justify-content-between align-items-center ">
        <Card.Img
          className="ProductCard-image"
          variant="top"
          src={product.image.url}
        />
        <Card.Body className="ProductCard-body">
          <div className="d-flex flex-column align-items-start">
            <Card.Title className="ProductCard-title">
              {product.name}
            </Card.Title>
            <Card.Text className="ProductCard-text">
              {numberToMoney(product?.price)} تومان
            </Card.Text>
          </div>

          <Button className="ProductCard-btn " onClick={handelClickOrder}>
            سفارش
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
