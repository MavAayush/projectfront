import React from 'react'
import "./footer.css"
import { NavLink } from 'react-router-dom';
import { FaRegCopyright } from "react-icons/fa6";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="footer_container">
                <div className='footer_details_one'>
                    <h3>Get to Know US</h3>
                    <NavLink to="/about-us">About Us</NavLink><br/>
                    <NavLink to="/contact-us">Contact Us</NavLink><br/>
                    <NavLink to="/address">Addresss</NavLink><br/>
                    <NavLink to="/terms-and-conditions">Terms And Conditions</NavLink><br/>
                </div>
                <div className='footer_details_one'>
                    <h3>Connect With US</h3>
                    <p>Email</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                </div>
                <div className='footer_details_one forres'>
                    <h3>Customer Services</h3>
                    <NavLink to="/login">My Account</NavLink><br/>
                    <NavLink to="/shipping-policy">Shipping Policy</NavLink><br/>
                    <NavLink to="/return-policy">Return Policy</NavLink><br/>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink><br/>
                    <NavLink to="/help">Help</NavLink><br/>
                </div>
            </div>
            <div className="lastdetails">
                <img src={`${BASE_URL}/images/Logo.png`} className="logo" alt="logo" />
                <p>Conditions of Use & Sale &nbsp; &nbsp; &nbsp; Privacy Note</p>
                <p><FaRegCopyright /> Kesari Traders 1927-{year}</p>
            </div>
        </footer>
    )
}

export default Footer
