// Checkbox is the child component, parent component: Shop

import React, {useState, useEffect} from 'react';



const Checkbox = ({categories, handleFilters}) => {

// handleToggle is used to get the category and returns the another function. This method gets fired
// whenever there is an onChange event happening in the input. Takes c._id as an argument
// we'll first check that if the category is already in the state. 
// Basic idea: get the array of the selected categories and then send that to the backend and make a fetch request from the same.

    const [checked, setChecked] = useState([])
    const handleToggle = c => () => {

        // return the first index of -1
        // this will tell us if its already there, if not then it wlll return -1. 

        const currentCategoryId = checked.indexOf(c)    

        //  give us all the category ids in the state

        const newCheckedCategoryId = [...checked]

        // if currently checked is not already in the checked state > push
        // else pull/take off

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId)

        // update the state
        
        setChecked(newCheckedCategoryId);

        // with the help of this method, an array of filters will be passed
        handleFilters(newCheckedCategoryId);

    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};




export default Checkbox;