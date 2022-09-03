import { Col, Container, Row } from "react-bootstrap";
import Cartemp from "../../components/Cartemp/Cartemp";
import NavBar from "../../components/global/NavBar/NavBar";
import "./CartempRouter.scss";

const CartempRouter = () => {
  return (
    <section className="d-flex flex-column">
      <NavBar />
      <Container
        fluid
        className="CartempRouter d-flex flex-column justify-content-center align-items-center"
      >
        <Row className="justify-content-center m-0 w-100">
          <Col
            className=" d-flex justify-content-center p-0"
            xs={12}
            sm={10}
            xl={8}
          >
            <Cartemp />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartempRouter;
