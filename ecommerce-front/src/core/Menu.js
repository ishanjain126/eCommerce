import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

var img_src1 = require(`../images/favicon.png`);

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'white' }
    }
    else {
        return { color: 'grey' }
    }
};




const Menu = ({ history }) => {
    const auth = isAuthenticated();
    return (
        <div>
            <div id="menu" class="nav-row">
                <div class="nav-blocks home"><Link style={isActive(history, '/')} to="/"><img className="home_img" src={img_src1} /></Link></div>
                <Search />
                <div class="nav-blocks"><Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link></div>
                <div class="nav-blocks cart-set"><Link className="nav-link" style={isActive(history, '/cart')} to="/cart"><div className="cart-badge">{itemTotal()}</div><FontAwesomeIcon icon={faShoppingCart} className="card-icon"></FontAwesomeIcon></Link></div>
                {auth && auth.user && auth.user.role === 0 && (
                    <div class="nav-blocks"><Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link></div>
                )}
                {auth && auth.user && auth.user.role === 1 && (
                    <div class="nav-blocks"><Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link></div>
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
                        <span id="signout-span"
                            style={{ cursor: 'pointer', color: "#ffffff" }}
                            onClick={() => signout(() => {
                                history.push('/');
                            })}>
                            Signout
                    </span>
                    </div>

                )}
            </div>

        </div>

    );
};


export default withRouter(Menu);
