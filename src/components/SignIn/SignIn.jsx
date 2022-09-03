import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../../assets/image/logo.png";

import VerifyCode from "./VerifyCode/VerifyCode";

import "./SignIn.scss";
import SendSMS from "./SendSMS/SendSMS";

const SignIn = () => {
  const [step, setStep] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <div className="SignIn">
      <Row>
        <Col>
          <img className="SignIn-logo" src={logo} alt="logo" />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {step ? (
            <VerifyCode setStep={setStep} phoneNumber={phoneNumber} />
          ) : (
            <SendSMS setStep={setStep} setPhoneNumber={setPhoneNumber} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
