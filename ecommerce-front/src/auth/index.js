import {API} from '../config'


export const signup = (user) => {
    // console.log(name, email, password);
    return(fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })

    .then(response => {
        return response.json(); 
    })
    .catch(err => {
        console.log(err);
    })
    )
};



export const signin = user => {
    // console.log(name, email, password);
    return (
        fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })

    .then(response => {
        return response.json(); 
    })
    .catch(err => {
        console.log(err);
    })
    )
};


export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}


// in this callback we can do the redirect when user logs out of the app
// we also clear out the local storage
// fetch request to ask the backend to log out the user. 
export const signout = (next) => {

    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next();
        return fetch(`${API}/signout`, {
            method : "GET",
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err => {
            console.log(err);
        })
    }

}

// helper method to hide the links, when the user is logged in and when he is not
export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}