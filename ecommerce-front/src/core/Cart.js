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
                <h2> Your cart has {`${items.length}`} items. </h2>
                <hr />

             {/* looking through each product and giving it to display  */}
                {items.map((product, i) => (
                    <Card 
                    key={i} 
                    product={product} 
                    showAddToCartButton={false}
                    cartUpdate={true}
                    showRemoveProductButton = {true}
                    setRun = {setRun}
                    run = {run}
                    />
                ))}
            </div>
        )
    }

    const noItemsMessage = () => {
        return(
            <h2>You cart is empty. <br />
                <Link to="/shop">Continue Shopping</Link>
            </h2>
        )
    };

    return (
        <Layout title = "Shopping Cart" description = "Shop Now!" className="container-fluid">
            <div class="menu-background"></div>
            <div className="row">

                <div className="col-6 mb-2">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
};

export default Cart;
