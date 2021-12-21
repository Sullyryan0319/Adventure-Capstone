import { Row, Col, Card, Container } from "react-bootstrap/";
import dude from '../../assets/dude.jpeg';



const AdventurerProfile = ({user}) => {
    return (  
      <Col md={3} xs={12}>
        <Card>
        <Card.Title style={{fontSize: "40px", padding: "20px", margin: "30px", textAlign: "center"  }}>All Who Wander Are Not Lost</Card.Title>

        <Card.Img variant="top" src={dude} />
        <Card.Body>
          <Card.Text style={{fontSize: "25px"}}>
            First Name: {user.firstName}<br/>
            Last Name: {user.lastName}<br/>
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
  
    );
}
 
export default AdventurerProfile;