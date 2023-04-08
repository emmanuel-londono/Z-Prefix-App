//imports
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { ApplicationContext } from "../App";



//Style Imports
import { Col, Container, Row, Carousel, Button, Modal } from "react-bootstrap"
import '../css/Login.css'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

export const Login = () => {
    const navigate = useNavigate();



    const { loggedIn, setLoggedIn } = useContext(ApplicationContext);
    const { authUser, setAuthUser } = useContext(ApplicationContext);
    const [signupShow, setSignUpShow] = useState(false)
    const [show, setShow] = useState(false)
    const [newUser, setNewUser] = useState({ first_name: 'Bob', last_name: '0', username: 'User.name', password: '123' })
    const [loginUser, setLoginUser] = useState({ username: 'jane.doe', password: '123' })

    const handleClose = () => { setSignUpShow(false); setShow(false) }
    const handleShow = () => setShow(true);











    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        //Description Form
        if (e.target.id === "first_name") {
            if (e.target.value === undefined) {
                setNewUser({ ...newUser, first_name: 'Bob' })
                console.log(newUser)
            } else { console.log(newUser); setNewUser({ ...newUser, first_name: e.target.value }) }
        }
        //last_name
        else if (e.target.id === "last_name") {
            if (e.target.value === undefined) {
                setNewUser({ ...newUser, last_name: '0' })
                console.log(newUser)
            } else { console.log(newUser); setNewUser({ ...newUser, last_name: e.target.value }) }
        }
        //username
        else if (e.target.id === "username") {
            if (e.target.value === undefined) {
                setNewUser({ ...newUser, username: 'User.name' })
                console.log(newUser)
            } else { console.log(newUser); setNewUser({ ...newUser, username: e.target.value }) }
        }
        //password
        else if (e.target.id === "password") {
            if (e.target.value === undefined) {
                setNewUser({ ...newUser, password: '123' })
                console.log(newUser)
            } else { console.log(newUser); setNewUser({ ...newUser, password: e.target.value }) }
        }
    }



    const handleLoginChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        //username
        if (e.target.id === "username") {
            if (e.target.value === undefined) {
                setLoginUser({ ...loginUser, username: 'Default' })
                console.log(loginUser)
            } else { console.log(loginUser); setLoginUser({ ...loginUser, username: e.target.value }) }
        }
        //password
        else if (e.target.id === "password") {
            if (e.target.value === undefined) {
                setLoginUser({ ...loginUser, password: '123' })
                console.log(loginUser)
            } else { console.log(loginUser); setLoginUser({ ...loginUser, password: e.target.value }) }
        }
    }




    const clickCreate = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:3001/signup", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json()).then(json => { console.log(json); setNewUser(json[0]); return setShow(true) })


    }


    const clickLogin = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else { return alert('Wrong Credentials! Please Try Again') }
        }).then(json => {
            let { path, _expires, originalMaxAge, httpOnly } = json.cookie
            let { session_id } = json.session_id
            console.log(json);
            Cookies.set('session_id', `${session_id}`, { expires: 1, path: '/login' })
            setLoggedIn(json.authenticated)
            setAuthUser({username:json.username, password:json.password, first_name:json.first_name, last_name:json.last_name, session_id: json.session_id, id:json.user_id, authenticated: json.authenticated});
            console.log(authUser)
            setLoggedIn(true);
            return navigate('/home')
        })

    }










    return (

        <>

            <Container fluid className='central-Login'>
                {signupShow === true ?

                    (<Row className="loginSquare">
                        <Col className="left-col-login">
                            <Col className="logo-insert"><img id="login-logo" src='inventory box logo.png'></img></Col>
                            <Col className="login-form">
                                <h3 className="Welcome-title">Sign-Up</h3>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        First Name
                                    </InputLabel>
                                    <Input
                                        onChange={handleChange}
                                        id="first_name"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Last Name
                                    </InputLabel>
                                    <Input
                                        onChange={handleChange}
                                        id="last_name"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <BadgeOutlinedIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Username
                                    </InputLabel>
                                    <Input
                                        onChange={handleChange}
                                        id="username"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Password
                                    </InputLabel>
                                    <Input
                                        onChange={handleChange}
                                        id="password"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <HttpsOutlinedIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Row>
                                    <Col style={{ textAlign: 'center' }}> <Button onClick={clickCreate} classname="create-pri" variant="danger">Create Account</Button></Col>

                                </Row>
                                <Row style={{ marginTop: '5%' }} >
                                    <Col style={{ textAlign: 'end', justifyContent: 'center', fontSize: '12px', fontStyle: 'italic' }} >
                                        <span style={{ marginRight: '15%' }}>Go back to Login?</span>
                                    </Col>
                                    <Col onClick={() => { setSignUpShow(true); setSignUpShow(false) }} style={{ textAlign: 'start', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }} >
                                        <span style={{ marginLeft: '20%' }}>Click Here!</span>
                                    </Col>
                                </Row>







                            </Col>






                        </Col>
                        <Col className="right-col-login">
                            <Carousel fade>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="holder.js/800x400?text=First slide&bg=373940"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                        </Col>

                    </Row>)

                    :

                    (<Row className="loginSquare">
                        <Col className="left-col-login">
                            <Col className="logo-insert"><img id="login-logo" src='inventory box logo.png'></img></Col>
                            <Col className="login-form">
                                <h3 className="Welcome-title">Welcome</h3>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Username
                                    </InputLabel>
                                    <Input
                                        onChange={handleLoginChange}
                                        id="username"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Password
                                    </InputLabel>

                                    <Input
                                        onChange={handleLoginChange}
                                        id="password"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <HttpsOutlinedIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Row>
                                    <Col> <Button onClick={clickLogin} classname="login-pri" variant="secondary">Login</Button>{' '}</Col>
                                    <Col> <Button onClick={() => setSignUpShow(true)} classname="sign-up-pri" variant="caution">Sign Up</Button>{' '}</Col>
                                </Row>
                                <Row style={{ marginTop: '5%' }} >
                                    <Col style={{ textAlign: 'end', justifyContent: 'center', fontSize: '12px', fontStyle: 'italic' }} >
                                        <span style={{ marginRight: '15%' }}>Continue as Visitor?</span>
                                    </Col>
                                    <Col onClick={() => { console.log(loginUser); return navigate('/home') }} style={{ textAlign: 'start', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }} >
                                        <span style={{ marginLeft: '20%' }}>Click Here!</span>
                                    </Col>
                                </Row>







                            </Col>






                        </Col>
                        <Col className="right-col-login">
                            <Carousel fade>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="holder.js/800x400?text=First slide&bg=373940"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                        </Col>

                    </Row>)}

            </Container>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Created New User: {newUser.first_name} {newUser.last_name}</Modal.Title>
                </Modal.Header>
            </Modal>









        </>

    )
}