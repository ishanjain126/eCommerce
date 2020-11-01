import React from 'react';
import Menu from './Menu'
import "../style.css";
import Footer from './footer';
// import bgimage from '../images/3.jpeg'
// style={{backgroundImage: `url(${bgimage})`}}

const Layout = ( {title = 'Title', description = 'Description', className, children} )=> 
(
    <div className="container-fluid layout">
        <Menu />
        <div className={className + " layout-content"}> {children} </div>
        <Footer />
    </div>
);


export default Layout;

// test