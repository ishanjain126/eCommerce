import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link, Redirect} from 'react-router-dom'
import {read, update, updateUser} from './apiUser'

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:false,
        success:false
    })

    // destructuring the properties
    const {name, email, password, error, success} = values

    // destructure the token
    const {token} = isAuthenticated()


    // load the user information using init
    // makes the request to the backend to get the required info
    const init = (userId) => {
    //    console.log(userId)
        read(userId, token).then(data => {
            if(data.error){
                setValues({...values, error:true})
            }
            else{
                // pre populate the existing information in the form. If user wants to update he/she can do so.
                setValues({...values, name:data.name, email:data.email })
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    }, [])

    // handle change (when user changes the name)
    // handle change is the higher order function (a function that return another function); 
    // first we grab the name and then the event
    const handleChange = (name) => e => {
        setValues({...values, error:false, [name]: e.target.value})
    }

    // after clicking the submit button
    const clickSubmit = (e) => {
        e.preventDefault()
        update(match.params.userId, token, {name, email, password} ).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                // sets the information in the local storage so that the user doesn't have to signin to see the changes
                updateUser(data, () => {
                    setValues({...values, name:data.name, email:data.email, success:true})
                })
            }
        });
    };

    // if user successfully updates the form then redirect him/her to the 
    const redirectUser = (success) => {
        if(success){
            return(
                <Redirect to="/user/dashboard" />
            )
        }
    }

    // form for the profile update
    const profileUpdate = (name, email, password) => (
        
        
        <form>
        <div id = "update-profile">
            <h2>UPDATE PROFILE</h2>
        
            
                <div className = "form-group">
                <label class = "h2">Name</label>
                <input type="text" 
                onChange={handleChange('name')} 
                className="form-control" 
                value={name} />
            
                </div>
            <div className="form-group">
                <label class = "h2">Email</label>
                <input type="email" 
                onChange={handleChange('email')} 
                className="form-control" 
                value={email} />
            </div>

            <div className="form-group">
                <label class = "h2">Password</label>
                <input type="password" 
                onChange={handleChange('password')} 
                className="form-control" 
                value={password} />
            </div>
          
            <button onClick={clickSubmit} className="btn btn-outline-primary buttonHover">Submit</button>
            </div>
        </form>
        
    )

    return (
        <Layout title = "User Profile" description = "Update your profile" className="container-fluid">
            <div class="menu-background"></div>
            

            <div className="cat-card center-96">  
            <div className="row jumbotron height-adjust border-15 pad-null">
                <div className="colw20 specify-height marg-reduce"><div className="vert-text">UPDATE PROFILE</div></div>
                <div className="colw80 pad-null specify-height info pad-increase">
                {profileUpdate(name, email, password)}
                {redirectUser(success)}
                </div>
            </div>
            </div>


        </Layout>
    );

}

export default Profile; 