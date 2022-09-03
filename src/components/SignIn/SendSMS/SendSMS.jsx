import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import queryHooks from "../../hooks/queryHooks";
import { Strings } from "../../../assets/strings/strings";
import ReactLoading from "react-loading";

import "./SendSMS.scss";

const SendSMS = ({ setStep, setPhoneNumber }) => {
  const [number, setNumber] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sendSMS } = queryHooks.useLogin();

  const handelChange = (e) => {
    setNumber(e.target.value);
  };

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();

      const phoneTest = new RegExp(/09[0-3]{1}\d{8}/);

      if (phoneTest.test(number)) {
        setLoading(true);
        await sendSMS(number);
        setLoading(false);
        setPhoneNumber(number);
        setStep(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <ReactLoading
      className="loading"
      type="spin"
      color="#fff"
      delay={100}
      width={50}
      height={50}
    />
  ) : (
    <Form
      className="FormSendSMS d-flex flex-column justify-content-center align-items-center w-100"
      onSubmit={handelSubmit}
    >
      <Form.Group className="FormSendSMS-input mb-3">
        <Form.Control
          type="tel"
          placeholder={Strings.SEND_SMS.EnterPhone}
          value={number}
          onChange={handelChange}
          dir="ltr"
        />
        {showError ? (
          <Form.Text className="FormSendSMS-error">
            {Strings.SEND_SMS.PhoneError}
          </Form.Text>
        ) : null}
      </Form.Group>
      <Button className="FormSendSMS-btn mb-1" variant="light" type="submit">
        {Strings.SEND_SMS.PhoneButton}
      </Button>
      <Form.Group>
        <a className="FormSendSMS-text" href="#">
          {Strings.SEND_SMS.RulesText}
        </a>
      </Form.Group>
    </Form>
  );
};

export default SendSMS;
