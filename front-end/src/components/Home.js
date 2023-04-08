import { Container, Row, Col } from "react-bootstrap"
import { NaviBar } from "./NaviBar"
import { AddItem } from "./AddItem"
import { Inventory } from "./Inventory"








import '../css/Home.css'

export const Home = () => {

  return (


    <Container fluid className='central'>
      <Row>
        <Col className='navCOL' xs={3}>
          <NaviBar />
        </Col>
        <Col className='invAddCol'>
          <AddItem />
          <Inventory />
        </Col>
      </Row>
    </Container>

  )
}

