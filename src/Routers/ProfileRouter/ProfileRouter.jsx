import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../../components/global/NavBar/NavBar";
import Profile from "../../components/Profile/Profile";
import "./ProfileRouter.scss";

const PofileRouter = () => {
  return (
    <div className="PofileRouter">
      <NavBar />
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="p-0" xs={12} sm={10} xl={8}>
            <Profile />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PofileRouter;
