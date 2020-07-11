import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getCategories, list } from './apiCore'
import Card from './Card';


const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    // destructuring
    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setData({...data, categories: data});
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    } 

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products...`
        }
        if(searched && results.length < 1) {
            return `No products found! `
        }
    }


    // mapping through each result and displaying them in the cart. Also displaying the message
    const searchedProducts = (results = []) => {
       return ( 

        <div>
            <h6 className="mt-4 mb-4">
                {searchMessage(searched, results)}
            </h6>

       <div className="row">
           {results.map((product, i) => (
               <div key={i} className="col-3 mb-3">
                    <Card  product={product} />
                </div>
           ))}
        </div>
    </div>
       );
    };

    const searchForm = () => (
        <form id="search-form" onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group">
                    <div className="input-group-prepend ">
                        <select id="nav-select" className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                                </option>
                                ))}
                        </select>
                    </div>
                    <input 
                        type="search"
                        className="form-control" 
                        onChange={handleChange('search')} 
                        placeholder="Search by name" />
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button id="search-button" className="input-group-text">Search</button>
                </div>
            </span>
        </form>
        );

    return(
        <div id="search-bar">
            <div className="search-container">
                {searchForm()} 
                {/* {JSON.stringify(results)} */}
            </div>
            <div id="results" className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
};

export default Search;
