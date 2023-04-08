//Imports
import { Views } from './components/Views';
import { createContext, useState } from 'react';
import { Container, Col, Row, } from 'react-bootstrap'
import './css/App.css'
//Create Application Context
export const ApplicationContext = createContext();


function App() {

  //Create states to pass to components

  const [query, setQuery] = useState();
  const [items, setItems] = useState([{
    id: 2,
    user_id: 3,
    item_name: 'Refined Concrete Salad',
    description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    quantity: '81'
  }]);
  const [activeItem, setActiveItem] = useState({
    id: 2,
    user_id: 3,
    item_name: 'Refined Concrete Salad',
    description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    quantity: '81'
});
const [loggedIn, setLoggedIn] = useState(false);
const [authUser, setAuthUser] = useState('');




  return (
    <ApplicationContext.Provider value={{ query, setQuery, items, setItems, activeItem, setActiveItem, loggedIn, setLoggedIn, authUser, setAuthUser}}>
      <Container fluid>
        <Views/>
      </Container>
    </ApplicationContext.Provider>
  );
}

export default App;
