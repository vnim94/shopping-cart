import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Store from './components/Store';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
    
    const [cart, setCart] = useState(new Map());
    const [numberOfItems, setNumberOfItems] = useState(0);

    // fetch shopping cart items upon mounting 
    useEffect(() => {
        if (localStorage.getItem('cart') != null) {
            setCart(new Map(Object.entries(JSON.parse(localStorage.getItem('cart')))));
        }
    }, []);

    useEffect(() => {
        let numberOfItems = 0;

        for (let item of cart.values()) {
            numberOfItems += parseInt(item.qty);
        }
        
        setNumberOfItems(numberOfItems);

    }, [cart])

    return (
        <Router>
            <div className="container flex flex-col">
                <Navbar numberOfItems={numberOfItems}/>
                <Switch>
                    <Route exact path="/">
                        <Store cart={cart} setCart={setCart}/>
                    </Route>
                    <Route path="/cart">
                        <Cart cart={cart} setCart={setCart} setNumberOfItems={setNumberOfItems}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
