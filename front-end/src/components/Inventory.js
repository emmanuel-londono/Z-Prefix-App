import { useEffect, useContext, useState } from "react"
import App, { ApplicationContext } from "../App";
import { Row, Col, Container, Table, Card, Modal, Button, Form } from "react-bootstrap"
import { SearchBar } from "./SearchBar";

//CSS Imports
import '../css/Inventory.css'
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export const Inventory = () => {

    const { items, setItems } = useContext(ApplicationContext);
    const { query, setQuery } = useContext(ApplicationContext);
    const { activeItem, setActiveItem } = useContext(ApplicationContext);
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [deleteObject, setDeleteObject] = useState({})
    const [isPending, setIsPending] = useState(true)



    useEffect(() => {
        fetch("http://localhost:3001/items").then(res => res.json()).then(data => { console.log(data); setActiveItem(data[0]); setItems(data) }).then(data => {
            return setIsPending(false);
        }).then(data => console.log(activeItem))
    }, [])





    //Event Handlers

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteClose = () => setDeleteShow(false)
    


    const clickItem = async (e) => {
        e.preventDefault();
        setQuery();
        setEditShow(false)
        let index;
        index = e.target.attributes.value.value;
        setActiveItem(items[index])
        console.log(activeItem)

    }

    const clickEdit = (e) => {

        setQuery({ description: activeItem.description, new_description: activeItem.description, user_id: activeItem.user_id, new_user_id: activeItem.user_id, item_name: activeItem.item_name, new_item_name: activeItem.item_name, quantity: activeItem.quantity, new_quantity: activeItem.quantity })

        setEditShow(true)

    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setEditShow(false)
        console.log(query)
        await fetch("http://localhost:3001/items", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query)
        }).then(res => res.json()).then(json => { console.log(json); setActiveItem(json[json.length - 1]); return setItems(json) })

    }

    const clickReturn = () => {
        setEditShow(false)
    }

    const clickDelete = async (e) => {
        e.preventDefault();
        setDeleteObject(activeItem)
        setDeleteShow(true);
        console.log(activeItem.id)
        await fetch("http://localhost:3001/items", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activeItem)
        }).then(res => res.json()).then(json => { console.log(json); setActiveItem(json[json.length - 1]); return setItems(json) })

    }








    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        //Description Form
        if (e.target.id === "description_form") {
            if (e.target.value === undefined) {
                setQuery({ ...query, description: activeItem.description, new_description: activeItem.description })
                console.log(query)
            } else { console.log(query); setQuery({ ...query, description: activeItem.description, new_description: e.target.value }) }
        }
        //User_id
        else if (e.target.id === "user_id_form") {
            if (e.target.value === undefined) {
                setQuery({ ...query, user_id: activeItem.user_id, new_user_id: activeItem.user_id })
                console.log(query)
            } else { console.log(query); setQuery({ ...query, user_id: activeItem.user_id, new_user_id: e.target.value }) }
        }
        //Item-name
        else if (e.target.id === "item_name_form") {
            if (e.target.value === undefined) {
                setQuery({ ...query, item_name: activeItem.item_name, new_item_name: activeItem.item_name })
                console.log(query)
            } else { console.log(query); setQuery({ ...query, item_name: activeItem.item_name, new_item_name: e.target.value }) }
        }
        //Quantity
        else if (e.target.id === "quantity_form") {
            if (e.target.value === undefined) {
                setQuery({ ...query, quantity: activeItem.quantity, new_quantity: activeItem.quantity })
                console.log(query)
            } else { console.log(query); setQuery({ ...query, quantity: activeItem.quantity, new_quantity: e.target.value }) }
        }
    }




    return (

        <>





            <Row className="inventory-container">
                <Row className="title-row"><div className="title" ><h3>Item Inventory</h3></div></Row>
                <Col className='left-inv'>
                    <SearchBar />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th><Row><Col>Item Id</Col><Col></Col></Row></th>
                                <th><Row><Col>User Id</Col><Col></Col></Row></th>
                                <th><Row><Col>Name</Col><Col></Col></Row></th>
                                <th><Row><Col>Quantity</Col><Col></Col></Row></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                return (

                                    <tr id={`tablerow-${index}`} onClick={clickItem}>
                                        <td id={`tableelement-${index + 1}`} value={index} >{item.id}</td>
                                        <td id={`tableelement-${index + 1000000}`} value={index}>{item.user_id}</td>
                                        <td id={`tableelement-${index + 10000}`} value={index}>{item.item_name}</td>
                                        <td id={`tableelement-${index + 100000}`} value={index}>{item.quantity}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </Col>
                {/* //Edit ability active */}
                {editShow === true ?

                    (<Col className="right-inv">
                        <h4 className="editTitle">Editing Item {activeItem.item_name}...</h4>
                        <Row className="item-stats">
                            <Col className="itemSpecs">
                                <Form.Label >{activeItem.item_name}</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    id="item_name_form"
                                    type="name"
                                    placeholder='Edit Item Name' />
                                <Col className="mt-2">
                                    <Form.Label >User Id = {activeItem.user_id}</Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        id="user_id_form"
                                        type="user_id"
                                        placeholder={`Edit User Id`} />
                                </Col>
                                <Col className="mt-2">
                                    <Form.Label >Quantity = {activeItem.quantity}</Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        id="quantity_form"
                                        type="Quantity"
                                        placeholder={`Edit Quantity`} />
                                </Col>
                            </Col>
                            <Col className="itemPic"><HomeRepairServiceOutlinedIcon style={{ fontSize: '100px' }} /></Col>
                        </Row>
                        <Row className="description-row">
                            <Col className="description"><h5>New Description:</h5>
                                <Col> <Form.Control
                                    onChange={handleChange}
                                    id="description_form"
                                    className="descriptionForm"
                                    type="description"
                                    placeholder={`${activeItem.description}`} /></Col>

                            </Col>
                        </Row>
                        <Row>
                            <Col><Button onClick={clickSubmit} className="editBtn">Finalize Edit</Button></Col>
                            <Col><Button onClick={clickReturn} className="returnBtn">Go Back <KeyboardReturnIcon /></Button></Col>
                        </Row>
                    </Col>)




                    :

                    // {/* //The edit ability is not active */ }
                    (<Col className="right-inv">
                        <Row className="item-stats">
                            <Col className="itemSpecs">
                                <h5 className="item-title-specs">{activeItem.item_name}</h5>
                                <Col className="mt-4">Item ID: {activeItem.id} </Col>
                                <Col className="mt-4">User ID: {activeItem.user_id} </Col>
                                <Col className="mt-4">Quantity: {activeItem.quantity} units </Col>
                            </Col>
                            <Col className="itemPic"><HomeRepairServiceOutlinedIcon style={{ fontSize: '100px' }} /></Col>
                        </Row>
                        <Row className="description-row">
                            <Col className="description"><h5>Description:</h5>
                                {activeItem.description.length >= 100 ?

                                    (<><Col>{activeItem.description.slice(0, 100)} ... </Col><Col className="m-4 text-end"><ReadMoreOutlinedIcon onClick={handleShow} /></Col></>)
                                    :
                                    (<Col>{activeItem.description}</Col>)
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col><Button onClick={clickEdit} className="editBtn">Edit <ModeEditOutlineOutlinedIcon /></Button></Col>
                            <Col><Button onClick={clickDelete} className="deleteBtn">Quick Delete<HighlightOffOutlinedIcon /></Button></Col>
                        </Row>
                    </Col>)}

            </Row>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{activeItem.item_name}'s <h3>Full Description View :</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>{activeItem.description}</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Header>
                    <Modal.Title>Deleted Item: {deleteObject.item_name} <h3></h3></Modal.Title>
                </Modal.Header>
            </Modal>

        </>








    )




}