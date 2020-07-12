import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Layout from './Layout';
import { getCart} from './cartHelpers'
import Card from './Card';
import Checkout from './Checkout';



const Cart= () => {
    // get the items from the local storage and populate here in the state
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItems(getCart())
    }, [run]);


    const showItems = items => {
        return (
            <div>
                <div className="cart-header"> Your cart has {`${items.length}`} items. </div>

                <div className="jumbotron prod-row greyback height-adjust">
                {/* looking through each product and giving it to display  */}
                    {items.map((product, i) => (
                        <div className="new-card" key={i}>
                        <Card 
                        product={product} 
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton = {true}
                        setRun = {setRun}
                        run = {run}
                        />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const noItemsMessage = () => {
        return(
            <div>
            <div className="cart-header">You cart is empty.</div>
            <div class="jumbotron cart-banner">
                <Link to="/shop">Continue Shopping</Link>
            </div>
            </div>
        )
    };

    return (
        <Layout title = "Shopping Cart" description = "Shop Now!" className="container-fluid" id="cart">
            <div class="menu-background"></div>
                <div>
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="cart-summary">
                    <h3>Your Cart Summary</h3>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
        </Layout>
    )
};

export default Cart;
