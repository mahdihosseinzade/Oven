import { useState } from "react";
import AddAddress from "../AddAddress/AddAddress";
import queryHooks from "../hooks/queryHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberToMoney } from "../../functions/functions";
import {
  faTimes,
  faPlus,
  faMinus,
  faList,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import "./Cartemp.scss";

const Cartemp = () => {
  const [delivery, setDelivery] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  const [description, setDescription] = useState("");
  const [discount, setDiscont] = useState("");

  const { modify } = queryHooks.useMofifyCart();
  const { data, isSuccess, isLoading, isError, isFetching } =
    queryHooks.useGetBasket();
  const branchs = queryHooks.useGetBranch();
  const userPublic = queryHooks.useGetPublic();

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

  const handleClickSubmit = () => {};
  return (
    <section className="Cartemp d-flex flex-column align-items-center">
      {isSuccess && (
        <section className="Cartemp-products d-flex flex-column justify-content-center align-items-center w-100">
          {data?.items?.map((item) => {
            return (
              <div
                className="Cartemp-products-product d-flex justify-content-between align-items-center w-100 "
                key={item._id}
              >
                <div className="Cartemp-products-product-boxImg">
                  <img
                    className="Cartemp-products-product-boxImg-img"
                    src={item.product.image.url}
                    alt={item.product.name}
                  />
                </div>
                <div className="Cartemp-products-product-content d-flex flex-column justify-content-between align-items-center">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="Cartemp-products-product-texts d-flex flex-column">
                      <strong className="Cartemp-products-product-texts-name">
                        {item.product.name}
                      </strong>
                      <strong className="Cartemp-products-product-texts-price">
                        {numberToMoney(item.product.price)}
                        {"  "}
                        تومان
                      </strong>
                    </div>
                    <div className="Cartemp-products-product-left d-flex justify-content-between align-items-center">
                      <div className="d-flex ">
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
                      <button
                        className="buttonIcon close-btn"
                        onClick={() => handleCloseClick(item)}
                      >
                        <FontAwesomeIcon className="icon mr-1" icon={faTimes} />
                      </button>
                    </div>
                  </div>
                  <strong className="Cartemp-products-product-texts-properties w-100">
                    {item.productProperties.map(
                      (property) =>
                        `${property.title} : ${numberToMoney(
                          property.price
                        )} تومان , `
                    )}
                  </strong>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <div className="Cartemp-delivery d-flex flex-column justify-content-center align-items-center ">
        <p className="Cartemp-delivery-title">انتخاب نوع سفارش</p>
        <div className="Cartemp-delivery-choice d-flex justify-content-around align-items-center ">
          <p
            className={!delivery ? "choice" : null}
            onClick={() => setDelivery(false)}
          >
            میام میبرم
          </p>
          <p
            className={delivery ? "choice" : null}
            onClick={() => setDelivery(true)}
          >
            برام بفرستید
          </p>
        </div>
      </div>
      <hr />
      {!delivery ? (
        <>
          <div className="Cartemp-branchs d-flex flex-row flex-wrap justify-content-center">
            {branchs?.data?.map((branch) => {
              return (
                <div
                  className="Cartemp-branchs-branch d-flex flex-column align-items-center"
                  key={branch.id}
                >
                  <img
                    className="Cartemp-branchs-branch-image"
                    src={branch.image.url}
                    alt={branch.name}
                  />
                  {branch.name}
                </div>
              );
            })}
          </div>
          <hr />
          <div className="Cartemp-text">
            *15 دقیقه بعد از ثبت ، سفارش آماده ی تحویل است*
          </div>
        </>
      ) : (
        <div className="Cartemp-address d-flex flex-column align-items-center">
          <div className="Cartemp-address-title">
            <FontAwesomeIcon
              className="Cartemp-address-title-icon"
              icon={faMapMarkerAlt}
            />
            یکی از آدرس های زیر را انتخاب کنید.
          </div>
          {!addAddress ? (
            <Button
              className="Cartemp-address-btn"
              onClick={() => setAddAddress(true)}
            >
              افزودن آدرس جدید
            </Button>
          ) : (
            <AddAddress />
          )}
        </div>
      )}

      <hr />
      <div className="Cartemp-description">
        <div className="Cartemp-description-title d-flex justify-content-center">
          <FontAwesomeIcon
            icon={faList}
            className="Cartemp-description-title-icon"
          />
          توضیحات سفارش
        </div>
        <textarea
          className="Cartemp-description-text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <hr />

      <div className="Cartemp-discount d-flex flex-column justify-content-around align-items-center w-100">
        کد تخفیف : 0%
        <div>
          <input
            className="Cartemp-discount-input"
            type="text"
            value={discount}
            onChange={(e) => setDiscont(e.target.value)}
          />
          <button className="Cartemp-discount-button">اعمال کد</button>
        </div>
      </div>
      <hr />
      {!delivery ? (
        <div className="Cartemp-time">
          زمان حدودی آماده سازی :{" "}
          {userPublic.isSuccess ? userPublic.data.data.ordTime : 0} دقیقه
        </div>
      ) : (
        <div className="Cartemp-time">
          زمان حدودی ارسال :{" "}
          {userPublic.isSuccess ? userPublic.data.data.sendTime : 0} دقیقه
        </div>
      )}

      <hr />
      <div className="Cartemp-price d-flex justify-content-around w-100">
        <div>
          هزینه پیک :{" "}
          {userPublic.isSuccess
            ? numberToMoney(userPublic.data.data.courierCost)
            : 0}{" "}
          تومان
        </div>
        <div>
          مبلغ سفارشات : {isSuccess ? numberToMoney(data.totalPrice) : 0}
          {"  "}
          تومان
        </div>
      </div>
      <hr />
      <div className="Cartemp-totalPrice d-flex justify-content-center align-items-center">
        <hr />
        مبلغ قابل پرداخت :{" "}
        {isSuccess && userPublic.isSuccess
          ? numberToMoney(data.totalPrice + userPublic.data.data.courierCost)
          : 0}
        {"  "}
        تومان
        <hr />
      </div>
      <hr />
      <Button className="Cartemp-button">پرداخت</Button>
    </section>
  );
};

export default Cartemp;
