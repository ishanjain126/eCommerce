import React from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'


const AdminDashboard = () => {

    // destructuring
    const { user: { name, email, role } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="card">

                <h4 className="card-header marg-reduce">Admin Links</h4>
                <ul className="list-group marg-reduce">
                    <li className="list-group-item">
                        <Link className="nav-blocks1" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-blocks1" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-blocks1" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5"  style={{display: 'inherit'}}>
                <h3 className="card-header">
                    User Information
                </h3>
                <ul className="list-group marg-reduce">
                    <li className="list-group-item"><h5>{name}</h5></li>
                    <li className="list-group-item"><h5>{email}</h5></li>
                    <li className="list-group-item"><h5>{role === 1 ? 'Admin' : "Registered User"}</h5></li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description={`Hello, ${name}!`} className="container-fluid">
            <div class="menu-background"></div>
            <div className="admin-bg">
                <div className="row">

                <div className="col-3">
                    {adminLinks()}
                </div>

                <div className="col-9">
                    {adminInfo()}
                </div>

                </div>
            </div>
        </Layout>
    );
};


export default AdminDashboard;