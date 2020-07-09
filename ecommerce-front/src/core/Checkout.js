import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Layout from './Layout';
import {getProducts} from "./apiCore"
import Card from './Card';
import {isAuthenticated} from '../auth';


// we need to have all the products from the cart and based on that we will calculate the total
const Checkout = ({products}) => {

    const getTotal = () => {

        // reduce method is used to calculate, can refer the its documentation
        return products.reduce((currentValue, nextValue) =>  {
            return currentValue + nextValue.count*nextValue.price;
        }, 0)
    }

    const showCheckout = () => {

            return isAuthenticated() ? (
                <button className="btn btn-success">Checkout</button>
            ) : (
                <Link to="/signin">
                    <button className="btn btn-primary">Sign-in-to-Checkout</button>
                </Link>
            );
    };

    return (
    <div>
        <h2> Total: ${getTotal()} </h2>

        {showCheckout()}

    </div>
    )
}


export default Checkout;
