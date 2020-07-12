import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom'
import {signup} from '../auth'

const Signup = () => 
{

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false     
    });

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value} )
    };


    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false });
        signup({ name, email, password })
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }
            else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success:true
                })
            }
        })
    };

    const signUpForm = () => (
        <div class="signup-back">
            <div class="form-container">
                <h1>UNDECIDED</h1>
                <div class="form-size">
                    <form id="signup-form">
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
                            

                        </div>

                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
                            
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                            
                        </div>

                        <button onClick={clickSubmit} className="btn btn-primary glow-green">
                            Submit
                        </button>

                    </form>
                    {showError()}

                </div>
            </div>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '': 'none'}}>
            New account is created. Please <Link to="./signin">Signin</Link> 
        </div>
    )

    return(
    <Layout 
    title="Signup Page" 
    description="Signup to Undecided"
    className="container-fluid">
        {showSuccess()}
        {signUpForm()}

    </Layout>  
);
};


export default Signup;
