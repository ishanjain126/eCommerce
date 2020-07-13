import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'

const ManageProducts = () => {

    // store the data in the state
    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    // to load all the products
    const loadProducts = () => {
        // get products to get all the products
        // then we get all the data
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setProducts(data)
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Layout title="Manage Products" description="Perform CRUD on Products" className="container-fluid">

            <div class="menu-background"></div>

            {/* <h2 className="mb-4"> Manage Products </h2> */}

            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} Products
                    </h2>
                    <hr />
                    <ul className="list-group">

                        {/* we need to display each product, so have to put the products in the loop */}
                        {/* mapping each product to the list */}

                        {products.map((p, i) => (

                            <div key={i}
                                className="row">
                                
                                <div className="col-md-4 ta-left"><strong>{p.name}</strong></div>
                                <div className="col-md-4 ta-center"><Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                </div>

                                {/* we need to pass the one argument => product id, everything else 
                                is already mentioned in the destroy function */}

                                <div className="col-md-4 ta-right"><span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Delete
                                </span>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>


        </Layout>
    );
}



export default ManageProducts;
