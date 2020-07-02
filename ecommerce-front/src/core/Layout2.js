import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Layout2 = () => {
    return (
        <div className="slider">
        <Carousel>
            <div>
                <img src="../images/1.jpg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="../images/2.jpg" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="../images/3.jpg" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
        </div>
    );
}


export default Layout2;
