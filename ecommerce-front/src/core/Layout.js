import React from 'react';
import Menu from './Menu'
import "../style.css";
// import bgimage from '../images/3.jpeg'
// style={{backgroundImage: `url(${bgimage})`}}

const Layout = ( {title = 'Title', description = 'Description', className, children} )=> 
(
    <div className="container-fluid">
        <Menu />
        <div className={className}> {children} </div>
    </div>
);


export default Layout;
