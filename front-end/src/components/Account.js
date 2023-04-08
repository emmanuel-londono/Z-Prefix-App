import { NaviBar } from "./NaviBar"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


import { ApplicationContext } from "../App";
import { useEffect, useContext, useState } from "react"



//CSS Imports
import { Row, Col, Container, Table, Card, Modal, Button, Form, Nav, } from "react-bootstrap"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';



import '../css/Home.css'
import '../css/Account.css'


export const Account = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [editUser, setEditUser] = useState({})

    const { loggedIn, setLoggedIn } = useContext(ApplicationContext);
    const { authUser, setAuthUser } = useContext(ApplicationContext);


    // useEffect(() => {
    //     fetch("http://localhost:3001/items").then(res => res.json()).then(data => { console.log(data); setActiveItem(data[0]); setItems(data) }).then(data => {
    //         return setIsPending(false);
    //     }).then(data => console.log(activeItem))
    // }, [])


    const clickSubmitUserEdit = async (e) => {
        e.preventDefault();
        setShow(false)

        console.log(editUser)
        await fetch("http://localhost:3001/account", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editUser)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else { return alert(' Please Try Again. Make sure to enter values into each text field!') }
        }).then(json => {
            return setAuthUser(json[0])

        })
    }

    const clickDeleteUser = async () => {

        setDeleteShow(true)
        console.log(authUser.id)
        await fetch("http://localhost:3001/account", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authUser)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else { return alert(' Wrong User ID, Please Try Again!') }
        })



    }









    const handleDeleteClose = (e) => {

        setDeleteShow(false)
        setLoggedIn(false)
        Cookies.remove('session_id')
        navigate('/')

    }



    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        //first_name Form
        if (e.target.id === "table_first_name") {
            if (e.target.value === undefined) {
                setEditUser({ ...editUser, first_name: authUser.first_name, new_first_name: authUser.first_name })
                console.log(editUser)
            } else { console.log(editUser); setEditUser({ ...editUser, first_name: authUser.first_name, new_first_name: e.target.value }) }
        }
        //User_id
        else if (e.target.id === "table_last_name") {
            if (e.target.value === undefined) {
                setEditUser({ ...editUser, last_name: authUser.last_name, new_last_name: authUser.first_name })
                console.log(editUser)
            } else { console.log(editUser); setEditUser({ ...editUser, last_name: authUser.last_name, new_last_name: e.target.value }) }
        }
        //Item-name
        else if (e.target.id === "table_username") {
            if (e.target.value === undefined) {
                setEditUser({ ...editUser, username: authUser.username, new_username: authUser.username })
                console.log(editUser)
            } else { console.log(editUser); setEditUser({ ...editUser, username: authUser.username, new_username: e.target.value }) }
        }
        //Quantity
        else if (e.target.id === "table_password") {
            if (e.target.value === undefined) {
                setEditUser({ ...editUser, password: authUser.password, new_password: authUser.password })
                console.log(editUser)
            } else { console.log(editUser); setEditUser({ ...editUser, password: authUser.password, new_password: e.target.value }) }
        }
    }











    return (


        <Container fluid className='central'>
            <Row>
                <Col className='navCOL' xs={3}>
                    <NaviBar />
                </Col>

                {show ?

                    (<>
                        <Col className='accAddCol'>


                            <Row className="account-container">
                                <Col xs={2} className='left-acc'>
                                    <h5>Editing My Profile...</h5>
                                    <Col style={{ textAlign: 'center', marginTop: '150px' }}>
                                        <Nav >
                                            <Nav.Item onClick={clickSubmitUserEdit} className="acc-nav">
                                                Submit<EditIcon />
                                            </Nav.Item >
                                            <Nav.Item onClick={() => setShow(false)} className="acc-nav-goBack">
                                                Go Back <KeyboardReturnIcon />
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                </Col>
                                <Col className='right-acc'>



                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th><Row><Col>First Name</Col><Col></Col></Row></th>
                                                <th><Row><Col>Last Name</Col><Col></Col></Row></th>
                                                <th><Row><Col>Username</Col><Col></Col></Row></th>
                                                <th><Row><Col>Password</Col><Col></Col></Row></th>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            <tr id='userTableRow' >
                                                <td  ><Form.Control onChange={handleChange} id={`table_first_name`}></Form.Control></td>
                                                <td ><Form.Control onChange={handleChange} id={`table_last_name`}></Form.Control></td>
                                                <td  ><Form.Control onChange={handleChange} id={`table_username`}></Form.Control></td>
                                                <td ><Form.Control onChange={handleChange} id={`table_password`}></Form.Control></td>

                                            </tr>



                                        </tbody>
                                    </Table>
                                </Col>


                            </Row>









                        </Col>


                    </>)

                    :

                    (<>

                        <Col className='accAddCol'>


                            <Row className="account-container">
                                <Col xs={2} className='left-acc'>
                                    <h5>My Profile</h5>
                                    <Col style={{ textAlign: 'center', marginTop: '150px' }}>
                                        <Nav onClick={() => setShow(true)} >
                                            <Nav.Item className="acc-nav">
                                                <AccountCircleIcon />Edit
                                            </Nav.Item >
                                            <Nav.Item onClick={clickDeleteUser} className="acc-nav-delete">
                                                <DeleteForeverIcon />Quick Delete
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                </Col>
                                <Col className='right-acc'>



                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th><Row><Col>First Name</Col><Col></Col></Row></th>
                                                <th><Row><Col>Last Name</Col><Col></Col></Row></th>
                                                <th><Row><Col>Username</Col><Col></Col></Row></th>
                                                <th><Row><Col>Password</Col><Col></Col></Row></th>
                                                <th><Row><Col>Session_id</Col><Col></Col></Row></th>
                                                <th><Row><Col>User_id</Col><Col></Col></Row></th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            <tr id='userTableRow' >
                                                <td id={`userTable-fn`} >{authUser.first_name}</td>
                                                <td id={`userTable-ln`} >{authUser.last_name}</td>
                                                <td id={`userTable-un`} >{authUser.username}</td>
                                                <td id={`userTable-pw`} >{authUser.password}</td>
                                                <td id={`userTable-sid`} >{authUser.session_id}</td>
                                                <td id={`userTable-id`} >{authUser.id}</td>
                                            </tr>



                                        </tbody>
                                    </Table>

                                </Col>


                            </Row>









                        </Col>








                    </>
                    )}


                <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header>
                        <Modal.Title>Deleted {authUser.first_name} {authUser.last_name}'s account! <h3></h3></Modal.Title>
                    </Modal.Header>
                </Modal>



            </Row >
        </Container >

    )
}

