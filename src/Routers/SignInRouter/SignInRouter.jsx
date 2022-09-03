import React from "react";
import SignIn from "../../components/SignIn/SignIn";
import { Container ,Row ,Col} from "react-bootstrap";
import './SignInRouter.scss';

const SignInRouter =()=>{

    return(
        <Container fluid className="SignInRouter d-flex justify-content-center align-items-center">
            <Row>
                <Col>
                    <SignIn/>
                </Col>
            </Row>
            
        </Container>
    )
}

export default SignInRouter;