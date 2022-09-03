import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import "./Order.scss";
import { useState } from "react";
import queryHooks from "../hooks/queryHooks";
import { toast } from "react-toastify";

const Order = ({ properties, productPrice, productId, setShowModal }) => {
  const { aP } = queryHooks.useAddProduct();
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState({});

  const price =
    productPrice +
    Object.values(selected).reduce((prev, cur) => prev + (cur?.price ?? 0), 0);

  const customProperties = properties.map((property) => {
    const options = property.data.map((item) => {
      return {
        value: item,
        label: (
          <div className="d-flex flex-row justify-content-between align-items-center">
            {item.title}
            <div className="d-flex flex-row justify-content-center align-items-center">
              <strong className="m-1">{item.price}</strong>
              تومان
            </div>
          </div>
        ),
      };
    });

    return {
      ...property,
      options: options,
    };
  });

  const handlePlusClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleMinusClick = () => {
    if (count === 0) {
      setCount(0);
      return;
    }
    setCount((prev) => prev - 1);
  };

  const handleChangeSelect = (e, property) => {
    setSelected({
      ...selected,
      [property._id]: e?.value,
    });
  };

  const validaition = () => {
    let valid = true;
    properties
      .filter((property) => property.force === true)
      .forEach((property) => {
        if (!selected[property._id]) {
          valid = false;
        }
      });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validaition()) {
      try {
        aP.mutateAsync({
          id: productId,
          count,
          properties: Object.values(selected),
        });
        setShowModal(false);
      } catch (error) {
        toast.error(error.response.data.userMSG);
      }
    } else {
      toast.error("لطفا محتویات اجباری را تکمیل کنید");
    }
  };

  return (
    <section
      className="Order d-flex flex-column justify-content-center"
      dir="rtl"
    >
      <Form className="Order-form" onSubmit={handleSubmit}>
        {customProperties.map((property) => {
          return (
            <Form.Group className="Order-form-item" key={property._id}>
              <Form.Label className="Order-form-item-title">
                {property.title}
                {property.force && <strong className="force">(اجباری)</strong>}
              </Form.Label>
              <Select
                className="Order-form-item-select"
                options={property.options}
                isSearchable={false}
                isClearable={true}
                defaultValue={property.defaultValue.title}
                placeholder={`${property.title} را انتخاب کنید`}
                onChange={(e) => handleChangeSelect(e, property)}
              />
            </Form.Group>
          );
        })}

        <div className="p-3">
          <div className=" d-flex flex-row justify-content-between align-items-center mb-3">
            تعداد
            <div className="Order-form-count">
              <FontAwesomeIcon
                className="Order-form-count-icon"
                icon={faPlus}
                onClick={handlePlusClick}
              />
              {count}
              <FontAwesomeIcon
                className="Order-form-count-icon"
                icon={faMinus}
                onClick={handleMinusClick}
              />
            </div>
          </div>
          <div className="Order-form-price d-flex flex-row justify-content-between">
            قیمت
            <div>
              <strong className="m-1">{price * count}</strong>
              تومان
            </div>
          </div>
        </div>
        <Button type="submit" className="Order-form-button">
          سفارش
        </Button>
      </Form>
    </section>
  );
};

export default Order;
