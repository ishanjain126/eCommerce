import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'


const Dashboard = () => {

    // state that will hold the history of the user's purchased order
    const [history, setHistory] = useState([])


    // destructuring
    const { user: { _id, name, email, role } } = isAuthenticated()
    const token = isAuthenticated().token

    // const auth = isAuthenticated();

    // if (auth && auth.user) {
    //     let { _id, name, email, role } = auth.user;


    // require the user id and token, as 
    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setHistory(data)
            }
        })
    }

    useEffect(() => {
        init(_id, token)
    })

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header marg-reduce">User Links</h4>
                <ul className="list-group marg-reduce">
                    <li className="list-group-item">
                        <Link className="nav-blocks2" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-blocks2" to={`./profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">
                    User Information
                </h3>
                <ul className="list-group marg-reduce">
                    <li className="list-group-item"><h5>{name}</h5></li>
                    <li className="list-group-item"><h5>{email}</h5></li>
                    <li className="list-group-item"><h5>{role === 1 ? 'Admin' : 'Registered User'}</h5></li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = () => {
        const rows = [];
        history.forEach(record => {
            const products = record.products.map(p => `${p.name} `);
            rows.push(
                <tr>
                     |<td scope="row">{record.createdAt.split('T')[0]} </td> |
                     <td>{products}</td> |
                     <td>{record.amount}</td> |
                     <td>{record.status}</td> |
                </tr>
            );
        });
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group marg-reduce">
                    <li className="list-group-item">
                        <table className="table table-borderless">
                            <thead>
                            <tr><strong>|</strong><th scope="col"><strong>Date</strong></th><strong>|</strong>
                                <th scope="col"><strong>Products</strong></th><strong>|</strong>
                                <th scope="col"><strong>Amount</strong></th><strong>|</strong>
                                <th scope="col"><strong>Status</strong></th><strong>|</strong></tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description={`Hello, ${name}!`} className="container-fluid">
            <div class="menu-background"></div>
            <div className="user-bg">
                <div className="row">

                    <div className="col-3">
                        {userLinks()}
                    </div>

                    <div className="col-9">
                        {userInfo()}
                    </div>
                    <div class="spacing-div"></div>
                    <div className="col-12">
                        {purchaseHistory(history)}
                    </div>

                </div>
            </div>
            <div className="spacing-div"></div>
        </Layout>
    );
};
export default Dashboard;
