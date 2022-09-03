import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { numberToMoney } from "../../functions/functions";

import {
  faShoppingCart,
  faTimes,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import queryHooks from "../hooks/queryHooks";

import "./Cart.scss";

import { Button } from "react-bootstrap";

const Cart = ({ setCount }) => {
  const { modify } = queryHooks.useMofifyCart();
  const { data, isSuccess, isLoading, isError, isFetching } =
    queryHooks.useGetBasket();

  const navigate = useNavigate();

  const handlePlusClick = (item) => {
    modify.mutateAsync({
      id: item.product._id,
      count: 1,
      itemId: item._id,
    });
  };

  const handleMinusClick = (item) => {
    if (item.count > 0) {
      modify.mutateAsync({
        id: item.product._id,
        count: -1,
        itemId: item._id,
      });
    }
  };

  const handleCloseClick = (item) => {
    modify.mutateAsync({
      id: item.product._id,
      count: -item.count,
      itemId: item._id,
    });
  };

  const handleClickSubmit = () => {
    navigate("/cartemp");
  };

  return (
    <section className="Cart ">
      <div className="Cart-header">
        <div className="Cart-header-shopping">
          <div className="Cart-header-shopping-number">
            {isSuccess
              ? data.items.reduce((prev, cur) => prev + cur.count, 0)
              : 0}
          </div>
          <FontAwesomeIcon
            className="Cart-header-shopping-icon"
            icon={faShoppingCart}
          />
        </div>
        سبد خرید
      </div>
      <div className="Cart-box d-flex flex-column justify-content-between w-100 h-100">
        {isSuccess && (
          <section className="Cart-selected-list d-flex flex-column justify-content-center align-items-center">
            {data?.items?.map((item) => {
              return (
                <div
                  className="Cart-selected-box d-flex flex-column w-100"
                  key={item._id}
                >
                  <div
                    className="Cart-selected-list-item d-flex flex-row justify-content-around align-items-center w-100"
                    key={item._id}
                  >
                    <div className="d-flex flex-row ">
                      <button
                        className="buttonIcon"
                        onClick={() => handleCloseClick(item)}
                      >
                        <FontAwesomeIcon
                          className="icon closed"
                          icon={faTimes}
                        />
                      </button>

                      <div className="Cart-selected-list-item-text d-flex flex-column justify-content-center align-items-start">
                        <strong>{item.product.name}</strong>
                        <div>
                          <strong className="m-1">
                            {numberToMoney(item.product.price)}
                          </strong>
                          تومان
                        </div>
                      </div>
                    </div>
                    <div className="Cart-selected-list-item-number  d-flex flex-row ">
                      <button
                        className="buttonIcon "
                        onClick={() => handlePlusClick(item)}
                      >
                        <FontAwesomeIcon className="icon " icon={faPlus} />
                      </button>
                      <strong className="countBox d-flex flex-row justify-content-center">
                        {item.count}
                      </strong>

                      <button
                        className="buttonIcon"
                        onClick={() => handleMinusClick(item)}
                      >
                        <FontAwesomeIcon className="icon" icon={faMinus} />
                      </button>
                    </div>
                  </div>
                  <div className="Cart-properties d-flex ">
                    {item.productProperties.map(
                      (property) =>
                        `${property.title} : ${numberToMoney(
                          property.price
                        )} تومان ، `
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        <div className="d-flex flex-column w-100 ">
          <div className="Cart-footer d-flex flex-row justify-content-around align-items-center">
            جمع سفارش
            <div className="totalPrice d-flex flex-row justify-content-center">
              {isFetching || modify.isLoading ? (
                <ReactLoading
                  className="loading"
                  type="spin"
                  color="#000"
                  delay={100}
                  width={20}
                  height={20}
                />
              ) : (
                <strong>{numberToMoney(data?.totalPrice ?? 0)}</strong>
              )}
            </div>
            تومان
          </div>
          <Button className="Cart-button" onClick={handleClickSubmit}>
            تکمیل سفارش
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
