import React from "react";
import { Container, Row, Col, FloatingLabel, Form, Button, Modal } from "react-bootstrap";
import "./login.css";

const LoginPage = (props) => {
    const user = props.user;
    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
          email: event.target[0].value,
          password: event.target[1].value,
        };
      
        props.login(userData);
        event.preventDefault();

        window.location = "/login"

      };
     
  return (
    <Container>
      <Row className = "center">
      <Col md={6} xs={12}>
        <p className="text-white">
          Welcome back! Adventure awaits!
        </p>
      </Col>
      <Col md={6} xs={12}>
        <>
          <Modal.Dialog>
            <Modal.Body className="mt-5">
            <Form onSubmit={ event => handleSubmit(event)}>
              <FloatingLabel controlId="email" label="Email" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="password" label="Password" className="mb-3">
                <Form.Control type="string" placeholder="Password" />
              </FloatingLabel>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Log In
                </Button>
              </div>
              </Form>
            </Modal.Body>
            <Modal.Footer className="d-grid gap-2 mb-5">
                <p>Not a registered Adventurer or Venue? Register</p>
            </Modal.Footer>
          </Modal.Dialog>
        </>
      </Col>
    </Row>

    </Container>
    
  );
};

export default LoginPage;
