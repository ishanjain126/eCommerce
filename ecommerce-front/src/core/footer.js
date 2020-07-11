import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = ({
    setRun = f => f,
    run = undefined
}) => {
    const [redirect, setRedirect] = useState(false);

    return (
        <div class="footer">
            <div class="footer-gradient">
                <div class="footer-social">
                    <div class="footer-social-item"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></div>
                    <div class="footer-social-item"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></div>
                    <div class="footer-social-item"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></div>
                </div>
                <div class="vertical-line"></div>
                <div class="footer-links">
                    <div class="footer-links-item">Shipping Information</div>
                    <div class="footer-links-item">Returns & Exchange</div>
                    <div class="footer-links-item">Privacy Policy</div>
                    <div class="footer-links-item">FAQ</div>
                    <div class="footer-links-item">Terms & Conditions</div>
                    <div class="footer-links-item">Contact Us</div>
                </div>
                <div class="vertical-line"></div>
                <div class="footer-rights">Copyright©2020<br />All Rights Reserved</div>

            </div>
        </div>
    );
};

export default Footer;