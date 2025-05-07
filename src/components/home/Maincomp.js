import React, { useEffect } from 'react'
import Banner from './Banner.js'
import "./home.css";
import Slide from './Slide.js';
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux"


const Maincomp = () => {

    console.log("Maincomp is renderingooooooooooooooooooo...");

    const {products} = useSelector((state) => state.getproductsdata);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Dispatching getProducts...");
        dispatch(getProducts());
    }, [dispatch]);
    

    console.log(products);

    return (
        <div className="home_section">
            <div className="banner_part">
                <Banner />
            </div>
            <Slide title="Our Products" products={products} />
            <div
  className="center_img"
  style={{
    backgroundImage: 'url("https://images.unsplash.com/photo-1649779117064-107e63b88758?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    position: "relative",
    width: "100%",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    marginTop: 0,
    paddingTop: 0,
    boxSizing: "border-box"
  }}
>

                <div className="overlay">
                    <h1>Shop Premium Tobacco Products</h1>
                    <p>Browse our extensive selection of premium tobacco products and more. Enjoy a seamless shopping experience from home.</p>
                </div>
            </div>
        </div>
    )
}

export default Maincomp