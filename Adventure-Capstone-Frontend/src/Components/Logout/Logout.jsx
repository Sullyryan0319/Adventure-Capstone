import React, { useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();


  const logout = async (user) => {
    setUser(null);
    navigate("../login", { replace: true });
    localStorage.deleteItem("token");
  };

  return (
    <Container>
            <button onClick={() => logout(user)}>Logout</button>

    </Container>
  );
};

export default Logout;