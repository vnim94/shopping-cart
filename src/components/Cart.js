import Item from "./Item";

function Cart(props) {

    const { cart, setCart, setNumberOfItems } = props;

    function removeFromCart(itemId) {
        
        if (window.confirm('Are you sure?')) {
        
            // delete item from cart map
            cart.delete(itemId);
            let updatedCart = new Map(cart);

            setCart(updatedCart);

            // update local storage
            localStorage.setItem('cart', JSON.stringify(Object.fromEntries(updatedCart)));
            
        }

    }

    function updateQty(event, itemId) {

        let item = cart.get(itemId);
        item.qty = event.target.value;
        cart.set(itemId, item);
        setCart(cart);

        // update total quantity
        let numberOfItems = 0;

        for (let item of cart.values()) {
            numberOfItems += parseInt(item.qty);
        }
        
        setNumberOfItems(numberOfItems);

        // update local storage
        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)));

    }

    return (
        <div className="container flex flex-col flex-ai-c">
            <div className="box">
                <h1>My Shopping Cart</h1>
            </div>
            <div className="box">
                {cart.size === 0 ? <h3>You don't have any items in your shopping cart!</h3> :
                    Array.from(cart.values()).map(item => {
                        return <Item key={item.details.name} product={item} removeFromCart={removeFromCart} updateQty={updateQty}/>
                    })
                }
            </div>
            <div className="box flex flex-jc-fe">
                <button className="bg-dark-green" disabled={cart.size === 0}>Checkout</button>
            </div>
        </div>
    )
}

export default Cart;