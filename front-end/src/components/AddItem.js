import { useState, useContext } from 'react';
import { Button, Offcanvas, Col, Form } from 'react-bootstrap';
import App, { ApplicationContext } from '../App';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import '../css/AddItem.css'
import PublishIcon from '@mui/icons-material/Publish';



export const AddItem = () => {

    const { items, setItems } = useContext(ApplicationContext);
    const {activeItem, setActiveItem} = useContext(ApplicationContext);
    const [addShow, setAddShow] = useState(false);
    const [newItem, setNewItem] = useState({})


    const handleClose = () => {
        setAddShow(false);
        console.log(newItem)
    }
    const clickAddItem = (e) => {
        e.preventDefault();
        setNewItem({ description: 'Test_description', user_id: "0", item_name: "Test_name", quantity: "0", });
        setAddShow(true)
    }
    const submitAddItem = async (e) => {
        e.preventDefault();
        setAddShow(false);
        await fetch("http://localhost:3001/items", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem)
        }).then(res => res.json()).then(json => { console.log(json); setActiveItem(json[json.length - 1]); return setItems(json) })

    }


    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        //Description Form
        if (e.target.id === "description_form") {
            if (e.target.value === undefined) {
                setNewItem({ ...newItem, description: 'Test_description' })
                console.log(newItem)
            } else { console.log(newItem); setNewItem({ ...newItem, description: e.target.value }) }
        }
        //User_id
        else if (e.target.id === "user_id_form") {
            if (e.target.value === undefined) {
                setNewItem({ ...newItem, user_id: '0' })
                console.log(newItem)
            } else { console.log(newItem); setNewItem({ ...newItem, user_id: e.target.value }) }
        }
        //Item-name
        else if (e.target.id === "item_name_form") {
            if (e.target.value === undefined) {
                setNewItem({ ...newItem, item_name: 'Test_item' })
                console.log(newItem)
            } else { console.log(newItem); setNewItem({ ...newItem, item_name: e.target.value }) }
        }
        //Quantity
        else if (e.target.id === "quantity_form") {
            if (e.target.value === undefined) {
                setNewItem({ ...newItem, quantity: '0' })
                console.log(newItem)
            } else { console.log(newItem); setNewItem({ ...newItem, quantity: e.target.value }) }
        }
    }





    return (

        <>
            <Col onClick={clickAddItem} className="addItemCol"><h5 className="addTitle">Add Item <AddCircleOutlineIcon /></h5></Col>
            <Offcanvas show={addShow} onHide={handleClose} placement={'top'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>Add New Item</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Col sm={4} >
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control id="item_name_form" onChange={handleChange} type="text" placeholder="Enter Item Name" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4} >
                        <Form>
                            <Form.Group className="mb-3 Des">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="description_form" onChange={handleChange} type="text" placeholder="Enter Description" />
                            </Form.Group>
                        </Form>
                    </Col><Col sm={4} >
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control id="quantity_form" onChange={handleChange} type="text" placeholder="Enter Integer Quantity" />
                            </Form.Group>
                        </Form>
                    </Col><Col sm={4} >
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>User Id</Form.Label>
                                <Form.Control id="user_id_form" onChange={handleChange} type="text" placeholder="Enter User Id" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Button onClick={submitAddItem} variant="primary" type="submit">
                        <PublishIcon /> Submit Item
                    </Button>




                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
} 