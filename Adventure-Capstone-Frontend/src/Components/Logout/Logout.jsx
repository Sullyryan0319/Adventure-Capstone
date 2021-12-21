import React, { useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();


  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("../login", { replace: true });
    window.location.reload(false);
  };

  return (
    <Container>
            <button onClick={() => logout()}>Logout</button>

    </Container>
  );
};

export default Logout;