import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories, getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
import Carousel from 'react-bootstrap/Carousel';

// this is the component which will be making all the backend requests, depending upon the filters. 

var img_src1 =require(`../images/Poster1.png`)
var img_src2 =require(`../images/Poster2.png`)

const Shop  = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    // loads categories
    const init = () => {
        getCategories()
        .then(data => {
            if(data.error){
                setError(data.Error)
            }
            else{
                setCategories(data)
            }
        }).catch((err) => {console.error(err)});
    };

    // filtering the components on the basis of filters (by categories and by price range)

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            }
            else{
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        }).catch((err) => {console.error(err)})
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error)
            }
            else{
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        }).catch((err) => {console.error(err)})
    }

    const loadMoreButton = () => {
        return(
            size>0 && size>= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    // this method is passed as the props to the Checkbox(the same way we did for the categories), 
    
    const handleFilters = (filters, filterBy) => {
        
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy == "price"){
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
        // console.log('SHOP', filters, filterBy)
    };

    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return(array);
    };


    return(

        <Layout title = "Shop" description = "Find what you need!" className="container-fluid">
            <div class="menu-background"></div>
            <Carousel>
            <Carousel.Item>
                <img
                src={img_src1}
                alt="First Poster"
                className = "poster"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                src={img_src2}
                alt="Second Poster"
                className = "poster"
                />
            </Carousel.Item>
            </Carousel>

        <div className="row">
            <div className="col-3 shop-box">
                <div className="sticky-div">
                <div className="shop-box-small">
                <h4>Filter by Categories</h4>
                <ul>
                <Checkbox 
                categories={categories} 
                handleFilters={filters => handleFilters(filters, 'category')} />
                </ul>
                </div>
                <div className="shop-box-small">
                <h4>Filter by Price Range</h4>
                <div className="radio-text">
                <RadioBox 
                prices={prices} 
                handleFilters={filters => handleFilters(filters, 'price')} />
                </div>
                </div>
                </div>
            </div>

            <div className="col-9">
               <h2 className="mb-4">Products</h2>
               <div className="row">
                   {filteredResults.map((product, i) => (
                       <div key={i} className="col-4 mb-3">
                           <Card product={product} />
                        </div>
                   ))}
               </div>
               <hr />
               {loadMoreButton()}
            </div>  
        </div>


        </Layout>
    )
}

export default Shop;
