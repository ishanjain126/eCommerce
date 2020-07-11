import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore'
import Card from './Card';
import Search from './Search'


var img_src =require(`../images/banner.png`)

const Home = () =>{

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold') .then (data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProductsBySell(data)
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt') .then (data => {
            if(data.error) { 
                setError(data.error);
            }
            else {
                setProductsByArrival(data)
            }
        });
    };

    useEffect( () => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Layout title = "Home Page" description = "Undecided" className="container-fluid">
            <div class="body-pad">
                <h2 className="mb-4"> New Arrivals </h2>
                <div class="include-logo">
                    <div className="prod-row">
                    {productsByArrival.map((product, i) => (
                        <div key={i} className="new-card">
                            <Card product={product} />
                        </div>
                    ))}
                    </div>
                    <div class="new-arrivals">NEW<br />ARRIVALS</div>
                    </div>
                </div>
            <img src={img_src} class="banner" />
            <div class="body-pad">
                <h2 className="mb-4"> Best Sellers </h2>
                <div className="row">        
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
                </div>
            </div>
        </Layout>
    );
};


export default Home;
