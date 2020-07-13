import React, { useState } from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'


const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    // destructure user and info from the lcoal storage
    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // make request to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                }
                else {
                    setError('');
                    setSuccess(true);
                }
            })

    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created.</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{name} already exists.</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link id = "link-to-dash" to="/admin/dashboard" >
                Back to dashboard
            </Link>
        </div>
    )

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div id = "new-category">
            <div className="form-group">
                <label className="h2">
                    Category Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    required />
            </div>
            <button className="btn btn-outline-primary buttonHover">
                Create Category
            </button>
            {goBack()}
            </div>
        </form>
    )

    return (
        <Layout title="Add new Category" description={`Hello, ${user.name}!, ready to add a new category?`} className="color-grey">
            <div class="menu-background"></div>

            <div className="cat-card center-96">  
            <div className="row jumbotron height-adjust border-15 pad-null">
                <div className="colw20 specify-height marg-reduce"><div className="vert-text">CREATE CATEGORY</div></div>
                <div className="colw80 pad-null specify-height info pad-increase">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>
            </div>
            </div>

        </Layout>
    )

}

export default AddCategory;
