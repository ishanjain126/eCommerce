import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import {itemTotal} from './cartHelpers';
import Search from './Search';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: 'white'}
    }
    else{
        return {color: 'grey'}
    }
};



const Menu = ({ history }) => {
    const auth = isAuthenticated();
    return (
    // <div>
    //     <ul className="nav nav-tabs bg-dark">

    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/')} to="/">
    //                 Home
    //             </Link>
    //         </li>


    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/')} to="/shop">
    //                 Shop
    //             </Link>
    //         </li>

            
    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/')} to="/cart">
    //                 Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
    //             </Link>
    //         </li>


    //         {auth && auth.user && auth.user.role === 0 && (
    //             <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">
    //                 Dashboard
    //             </Link>
    //         </li>
    //         )}

    //         {!auth && (
    //             <Fragment>
    //                 <li className="nav-item">
    //                     <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
    //                         Signin
    //                     </Link>
    //                 </li>

    //                 <li className="nav-item">
    //                     <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
    //                         Signup
    //                     </Link>
    //                 </li>
                    
    //             </Fragment>
    //         )}
            
    //         {auth && (
    //             <div>
    //                 <li className="nav-item">
    //                 <span className="nav-link"
    //                 style={{cursor: 'pointer', color:"#ffffff"}} 
    //                 onClick = {() => signout(() => {
    //                     history.push('/');
    //                 })}>
    //                     Signout
    //                 </span>
    //             </li>   
    //         </div>             
    //         )}

    //     </ul>
    // </div>
    <div id="menu" class="nav-row">
        <div class="nav-blocks home"><Link style={isActive(history, '/')} to="/"><i>U</i></Link></div>
        <Search />
        <div class="nav-blocks"><Link className="nav-link" style={isActive(history, '/')} to="/shop">Shop</Link></div>
        <div class="nav-blocks"><Link className="nav-link" style={isActive(history, '/')} to="/cart">Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link></div>
        {auth && auth.user && auth.user.role === 0 && (
            <div class="nav-blocks"><Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link></div>
        )}

        {!auth && (
            <Fragment>
                <div class="nav-blocks">
                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                        Signin
                    </Link>
                </div>

                <div className="nav-blocks">
                    <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                        Signup
                    </Link>
                </div>     
            </Fragment>
        )}

        {auth && (
                <div id="signout" className="nav-blocks">
                    <span 
                    style={{cursor: 'pointer', color:"#ffffff"}} 
                    onClick = {() => signout(() => {
                        history.push('/');
                    })}>
                        Signout
                    </span>
                </div>   
        
        )}

    </div>
);
};


export default withRouter(Menu);
