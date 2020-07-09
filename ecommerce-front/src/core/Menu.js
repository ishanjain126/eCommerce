import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import {itemTotal} from './cartHelpers';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: 'orange'}
    }
    else{
        return {color: '#ffffff'}
    }
};



const Menu = ({ history }) => {
    const auth = isAuthenticated();
    return (
    <div>
        <ul className="nav nav-tabs bg-dark">

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Home
                </Link>
            </li>


            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/shop">
                    Shop
                </Link>
            </li>

            
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/cart">
                    Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
                </Link>
            </li>


            {auth && auth.user && auth.user.role === 0 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            )}

            {!auth && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Signup
                        </Link>
                    </li>
                    
                </Fragment>
            )}
            
            {auth && (
                <div>
                    <li className="nav-item">
                    <span className="nav-link"
                    style={{cursor: 'pointer', color:"#ffffff"}} 
                    onClick = {() => signout(() => {
                        history.push('/');
                    })}>
                        Signout
                    </span>
                </li>   
            </div>             
            )}

        </ul>
    </div>
);
};


export default withRouter(Menu);
