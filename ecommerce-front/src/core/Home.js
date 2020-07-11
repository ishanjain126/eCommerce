import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore'
import Card from './Card';
import Search from './Search'
import Footer from './footer'
import Carousel from 'react-bootstrap/Carousel';

var img_src = require(`../images/banner.png`)
var img_src1 = require(`../images/Poster1.png`)
var img_src2 = require(`../images/Poster2.png`)
var seller_src = require(`../images/best.png`)

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProductsBySell(data)
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setProductsByArrival(data)
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Layout title="Home Page" description="Undecided" className="container-fluid">
            <div class="menu-background"></div>
            <Carousel>
                <Carousel.Item>
                    <img
                        src={img_src1}
                        alt="First Poster"
                        className="poster"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={img_src2}
                        alt="Second Poster"
                        className="poster"
                    />
                </Carousel.Item>
            </Carousel>
            <div class="body-pad">
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
            <div class="include-logo">
                <div class="best-sellers"><div class="circle"><img src={seller_src} class="seller" /></div></div>
                <div className="prod-row">
                    {productsBySell.map((product, i) => (
                        <div key={i} className="new-card">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};


export default Home;
