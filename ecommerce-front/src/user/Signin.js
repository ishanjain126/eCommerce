import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Redirect} from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'   
var loginback = require(`../images/login.jpg`)


const Signin = () => 
{

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });

    // Destructure
    const {email, password, loading, error, redirectToReferrer} = values;
    
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value} )
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, loading:true });
        signin({ email, password })
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading:false})
            }
            else{
                authenticate(
                    data, 
                    () => {
                        setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        })
    };

    const signInForm = () => (
    <div class="login-back">
        <div class="form-container">
            <h1>UNDECIDED</h1>
            <div class="form-size">
                <form id="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
                        
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                        
                    </div>

                    <button onClick={clickSubmit} className="btn btn-primary glow">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h3>Loading...</h3></div>)
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    }    

    return(
    <Layout
    title="Sign In Page" 
    description="Sign IN to Undecided"
    className="container-fluid">
        {showLoading()}
        {signInForm()}
        {showError()}
        {redirectUser()}

    </Layout>  
);
};


export default Signin;
