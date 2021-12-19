import { Row, Col, Card, Container } from "react-bootstrap/";



const AdventurerProfile = (user) => {
  alert("user= ", user);
    return (  
      <Col md={3} xs={12}>
        <Card>
        <Card.Img variant="top" src={``}/>
        <Card.Body>
          <Card.Title>All Who Wander Are Not Lost</Card.Title>
          <Card.Text>
            First Name: {user.firstName}<br/>
            Last Name: {user.lastName}<br/>
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
  
    );
}
 
export default AdventurerProfile;