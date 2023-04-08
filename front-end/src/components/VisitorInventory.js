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


export const VisitorInventory = () => {

    const { items, setItems } = useContext(ApplicationContext);
    const { query, setQuery } = useContext(ApplicationContext);
    const { activeItem, setActiveItem } = useContext(ApplicationContext);
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [dataisLoaded, setDataIsLoaded] = useState(false)
    const [isPending, setIsPending] = useState(true)



    useEffect(() => {
        fetch("http://localhost:3001/items").then(res => res.json()).then(data => { console.log(data); setActiveItem(data[0]); setItems(data) }).then(data => {
            return setIsPending(false);
        }).then(data => console.log(activeItem))
    }, [])





    //Event Handlers

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


    const clickItem = async (e) => {
        e.preventDefault();
        setQuery();
        setEditShow(false)
        let index;
        index = e.target.attributes.value.value;
        setActiveItem(items[index])
        console.log(activeItem)

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
                <Col className="right-inv">
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
                        
                    </Col>

            </Row>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{activeItem.item_name}'s <h3>Full Description View :</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>{activeItem.description}</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
    

        </>








    )




}