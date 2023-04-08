import { VisitorNaviBar } from "./VisitorNaviBar"



import { useEffect,  useState } from "react"



//CSS Imports
import { Row, Col, Container, Table } from "react-bootstrap"




import '../css/Home.css'

export const VisitorUsers = () => {

    const [allUsers, setAllUsers] = useState([{ first_name: 'Emmanuel', last_name: 'Londono', username: "emmanuel.londono", id: '0' }])

    useEffect(() => {
        fetch("http://localhost:3001/account").then(res => res.json()).then(data => { console.log(data); return setAllUsers(data); })
    }, [])



    return (




        <Container fluid className='central'>
            <Row>
                <Col className='navCOL' xs={3}>
                    <VisitorNaviBar />
                </Col>



                <Col className='usersAddCol'>


                    <Row className="account-container">
                        <Col xs={2} className='left-acc'>
                            <h5>All Profiles</h5>
                            
                        </Col>
                        <Col className='right-acc'>



                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th><Row><Col>First Name</Col><Col></Col></Row></th>
                                        <th><Row><Col>Last Name</Col><Col></Col></Row></th>
                                        <th><Row><Col>Username</Col><Col></Col></Row></th>
                                        <th><Row><Col>User_id</Col><Col></Col></Row></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((item, index) => {
                                        return (

                                            <tr id='userTableRow' >
                                                <td id={`userTable-fn${index}`} >{item.first_name}</td>
                                                <td id={`userTable-ln${index}`} >{item.last_name}</td>
                                                <td id={`userTable-un${index}`} >{item.username}</td>
                                                <td id={`userTable-id${index}`} >{item.id}</td>
                                            </tr>


                                        )
                                    })}

                                </tbody>

                            </Table>

                        </Col>


                    </Row>









                </Col>









{/* 
                <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header>
                        <Modal.Title>Deleted {authUser.first_name} {authUser.last_name}'s account! <h3></h3></Modal.Title>
                    </Modal.Header>
                </Modal> */}



            </Row >
            
        </Container >



    )
}