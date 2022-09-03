import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import queryHooks from "../../hooks/queryHooks";
import { Strings } from "../../../assets/strings/strings";
import "./VerifyCode.scss";
import { useUser } from "../../hooks/useUser";
import ReactLoading from "react-loading";

const VerifyCode = ({ setStep, phoneNumber }) => {
  const [code, setCode] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { verifyCode } = queryHooks.useLogin();
  const { login } = useUser();

  const handelChange = (e) => {
    setCode(e.target.value);
  };

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      const regCode = new RegExp(/[0-9]{4}/);
      if (regCode.test(code)) {
        const { data } = await verifyCode({ phoneNumber, code });
        setLoading(true);
        login(data);
      }
    } catch (error) {
      if (error.response.data.status) {
        setShowError(true);
      } else {
        console.log(error.response.data.userMSG);
      }
    }
  };

  const handelTextClick = () => {
    setStep(false);
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
      className="FormVerify d-flex flex-column justify-content-center align-items-center w-100"
      onSubmit={handelSubmit}
    >
      <Form.Group className="FormVerify-input mb-3">
        <Form.Control
          type="text"
          placeholder={Strings.VERYFY_CODE.EnterCode}
          value={code}
          onChange={handelChange}
          dir="ltr"
        />
        {showError ? (
          <Form.Text className="FormVerify-error">
            {Strings.VERYFY_CODE.CodeError}
          </Form.Text>
        ) : null}
      </Form.Group>
      <Button className="FormVerify-btn mb-1" variant="light" type="submit">
        {Strings.VERYFY_CODE.CodeButton}
      </Button>
      <Form.Group>
        <Form.Text className="FormVerify-text" onClick={handelTextClick}>
          {Strings.VERYFY_CODE.CodeText}
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default VerifyCode;
