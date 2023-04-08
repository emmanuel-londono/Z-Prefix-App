import { useContext, useState } from "react"
import App, { ApplicationContext } from "../App"
import { InputGroup, Form, Dropdown, DropdownButton, Col, SplitButton } from "react-bootstrap"
import '../css/SearchBar.css'




export const SearchBar = () => {
    const [formplaceholder, setFormPlaceHolder] = useState('Select Dropdown filter');
    const [filterPH, setFilterPH] = useState('Search By');
    const { activeItem, setActiveItem } = useContext(ApplicationContext);
    const { items, setItems } = useContext(ApplicationContext);
    const [query, setQuery] = useState({ id: "1" })
    const [liquidId, setLiquidId] = useState('')


    const clickFilter = (e) => {
        e.preventDefault();
        console.log(e.target)
        if (e.target.id === 'item_name') {
            setFormPlaceHolder('Enter the Item Name')
            setFilterPH('Search by Item Name')
            setQuery({ item_name: 'Test' })
            setLiquidId(e.target.id)
        } else if (e.target.id === 'item_id') {
            setFormPlaceHolder('Enter the Item Id')
            setFilterPH('Search by Item Id')
            setQuery({ id: '0' })
            setLiquidId(e.target.id)
        } else if (e.target.id === 'quantity') {
            setFormPlaceHolder('Enter the Item Quantity')
            setFilterPH('Search by Item Quantity')
            setQuery({ quantity: '0' })
            setLiquidId(e.target.id)
        } else if (e.target.id === 'user_id') {
            setFormPlaceHolder('Enter User Id')
            setFilterPH('Search by User Id')
            setQuery({ user_id: 'all' })
            setLiquidId(e.target.id)
        } else if (e.target.id === 'all') {
            setFormPlaceHolder('Press SEARCH for all items!')
            setFilterPH('Search for All Items')
            setQuery({ all: 'all' })
            setLiquidId(e.target.id)
        }


    }

    const clickSearch = async (e) => {
        e.preventDefault();
        console.log(query)

        await fetch("http://localhost:3001/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else { return alert('That value does not exist in the database. Please try a different value!') }
        })
            .then(json => { console.log(json); console.log(json); if(json.length === 0 ) setActiveItem(json[0]); else { setActiveItem(json[json.length - 1]); return setItems(json)} })

    }






    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)

        //Description Form
        if (e.target.attributes[0].nodeValue === 'item_name') {
            setQuery({ item_name: e.target.value })
        } else if (e.target.attributes[0].nodeValue === 'item_id') {
            setQuery({ id: e.target.value })
        } else if (e.target.attributes[0].nodeValue === 'quantity') {
            setQuery({ quantity: e.target.value })
        } else if (e.target.attributes[0].nodeValue === 'user_id') {
            setQuery({ user_id: e.target.value })
        } else if (e.target.attributes[0].nodeValue === 'all') {
            setQuery({ all: e.target.value })
        }

    }






    return (

        <>

            <Col xs={12}>
                <InputGroup className="SearchGroup">
                    <SplitButton
                        variant="outline-secondary"
                        title={filterPH}
                        id="segmented-button-dropdown-1"
                        onClick={clickSearch}
                    >
                        <Dropdown.Item id='item_name' onClick={clickFilter}>Item Name</Dropdown.Item>
                        <Dropdown.Item id='item_id' onClick={clickFilter}>Item_id</Dropdown.Item>
                        <Dropdown.Item id='user_id' onClick={clickFilter}>User_id</Dropdown.Item>
                        <Dropdown.Item id='quantity' onClick={clickFilter}>Quantity</Dropdown.Item>
                        <Dropdown.Item id='all' onClick={clickFilter}>All</Dropdown.Item>
                    </SplitButton>
                    <Form.Control idonchange={liquidId} onChange={handleChange} placeholder={formplaceholder} aria-label="Text input with dropdown button" />
                </InputGroup>


            </Col>

        </>
    )


}