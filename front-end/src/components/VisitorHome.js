import { Container, Row, Col } from "react-bootstrap"
import { VisitorNaviBar } from "./VisitorNaviBar"
import { AddItem } from "./AddItem"
import { VisitorInventory } from "./VisitorInventory"
import '../css/Home.css'

export const VisitorHome = () => {

  return (


    <Container fluid className='central'>
      <Row>
        <Col className='navCOL' xs={3}>
          <VisitorNaviBar />
        </Col>
        <Col className='invAddCol'>
          <VisitorInventory />
        </Col>
      </Row>
    </Container>

  )
}

