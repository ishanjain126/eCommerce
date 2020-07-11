import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {getPurchaseHistory} from './apiUser'


const Dashboard = () => {

    // state that will hold the history of the user's purchased order
    const [history, setHistory] = useState([])


    // destructuring
    const {user : {_id, name, email, role}} = isAuthenticated()
    const token = isAuthenticated().token
    
    // const auth = isAuthenticated();

    // if (auth && auth.user) {
    //     let { _id, name, email, role } = auth.user;


    // require the user id and token, as 
    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
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
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`./profile/${_id}`}>Update Profile</Link>
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
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>            
        )
    }

    const purchaseHistory = () => {
        const rows = [];
        history.forEach(record => {
            const products = record.products.map(p => `${p.name}, `);
            rows.push(
                <tr>
                    <td>{record.createdAt.split('T')[0]} | </td>
                    <td>{products} | </td>
                    <td>{record.amount} | </td>
                    <td>{record.status} | </td>
                </tr>
            );                         
        });
        return(
        <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <table>
                        <thead>
                            <td><strong>Date</strong></td>
                            <td><strong>Products</strong></td>
                            <td><strong>Amount</strong></td>
                            <td><strong>Status</strong></td>
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

    return(
        <Layout title="Dashboard" description={`Hello, ${name}!`} className="container-fluid">
            
            <div className="row">

                <div className="col-3">
                    {userLinks()}
                </div>    

                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>

            </div>

        </Layout>
    );
    };
export default Dashboard;
