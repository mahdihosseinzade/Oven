import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../../components/global/NavBar/NavBar";
import MyOrders from "../../components/MyOrders/MyOrders";
import "./MyOrdersRouter.scss";

const MyOrdersRouter = () => {
  return (
    <section className="MyOrdersRouter">
      <NavBar />
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} xl={8}>
            <MyOrders />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MyOrdersRouter;
