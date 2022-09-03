import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryHooks from "../hooks/queryHooks";
import { numberToMoney } from "../../functions/functions";
import {
  faArrowRight,
  faClock,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./MyOrders.scss";

const MyOrders = () => {
  const { data, isSuccess } = queryHooks.useGetOrder();
  return (
    <section className="MyOrders d-flex flex-column">
      <div className="MyOrders-header">تاریخچه سفارشات</div>
      <div className="MyOrders-content d-flex flex-column">
        <div className="MyOrders-content-info d-flex flex-column">
          <div className="MyOrders-content-info-data">
            <p className="MyOrders-content-info-data-factor">
              شماره فاکتور: نامعلوم
            </p>
            <p className="MyOrders-content-info-data-typeOrder">
              نوع سفارش : پیکاپ
            </p>
            <p className="MyOrders-content-info-data-branch">شعبه : کوثر</p>
            <p className="MyOrders-content-info-data-description">توضیحات :</p>
            <p className="MyOrders-content-info-data-time">
              تاریخ ثبت : 1400/12/03 02:35
            </p>
          </div>
          <div className="MyOrders-content-info-roadmap d-flex justify-content-center align-items-center">
            <div className="MyOrders-content-info-roadmap-clock d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon className="custom-icon" icon={faClock} />
            </div>
            <div className="MyOrders-content-info-roadmap-line" />
            <div className="MyOrders-content-info-roadmap-arrow d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon className="custom-icon" icon={faArrowRight} />
            </div>
          </div>
          <div className="MyOrders-content-info-time d-flex flex-column align-items-center">
            <FontAwesomeIcon className="custom-icon" icon={faClock} />
            زمان آماده سازی 15
          </div>
          <div className="MyOrders-content-info-comment d-flex flex-column align-items-center">
            <FontAwesomeIcon className="custom-icon" icon={faCommentAlt} />
            ثبت نظر
          </div>
        </div>
        <div className="MyOrders-content-details">
          {isSuccess &&
            data?.items?.map((item) => {
              return (
                <div
                  className="MyOrders-content-detail-products-product d-flex justify-content-between align-items-center w-100 "
                  key={item._id}
                >
                  <div className="MyOrders-content-detail-products-product-boxImg">
                    <img
                      className="MyOrders-content-detail-products-product-boxImg-img"
                      src={item.product.image.url}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="MyOrders-content-detail-products-product-content d-flex flex-column justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="MyOrders-content-detail-products-product-texts d-flex flex-column">
                        <strong className="MyOrders-content-detail-products-product-texts-name">
                          {item.product.name}
                        </strong>
                        <strong className="MyOrders-content-detail-products-product-texts-price">
                          {numberToMoney(item.product.price)}
                          {"  "}
                          تومان
                        </strong>
                      </div>
                      <div className="MyOrders-content-detail-products-product-left d-flex justify-content-between align-items-center">
                        <div className="d-flex ">
                          <strong className="countBox d-flex flex-row justify-content-center">
                            X{item.count}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <strong className="MyOrders-content-detail-products-product-texts-properties w-100">
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

          {/* <div className="Cartemp-price d-flex justify-content-around w-100">
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
              ? numberToMoney(
                  data.totalPrice + userPublic.data.data.courierCost
                )
              : 0}
            {"  "}
            تومان
            <hr />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
