import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/clerk-react";
import "./cart.css";

const BASE_URL = "https://projectbackend-d5qv.onrender.com";

const Cart = () => {
    const { id } = useParams("");
    const history = useNavigate();
    const { account, setAccount } = useContext(LoginContext);
    const { user, isSignedIn } = useUser();

    const [inddata, setInddata] = useState("");
    console.log(inddata);

    const getinddata = async () => {
        try {
            const res = await fetch(`https://projectbackend-d5qv.onrender.com/getproductsone/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log("Fetched Data:", data);

            if (res.status === 201 && data) {
                setInddata(data);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        setTimeout(getinddata, 1000)
    }, [id]);

    //add cart function
    const addtocart = async (id) => {
        if (!isSignedIn || !user) {
            // User is not logged in with Clerk, redirect to sign-in
            toast.warning("Sign in to proceed", {
                position: "top-center",
            })
            history("/login");
            return;
        }
    
        try {
            const checkres = await fetch(`https://projectbackend-d5qv.onrender.com/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "clerkid": user.id // Send Clerk user ID in header
                },
                body: JSON.stringify({ inddata })
            });
    
            const data1 = await checkres.json();
            console.log(data1);
    
            if (checkres.status === 401 || !data1) {
                console.log("User Invalid");
                toast.error("Authentication failed", {
                    position: "top-center",
                });
            } else {
                toast.success("Item Added to Cart", {
                    position: "top-center",
                    icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>, // custom icon with color
                    style: {
                        background: "#fff",
                        color: "#000",
                    },
                    progressStyle: {
                        background: "#D7A86E",
                    },
                });
                history("/buynow");
                setAccount(data1);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    
    return (
        <div className="cart_section">
            <div className="cart_container">
                {inddata ? ( 
                    <>
                        <div className="left_cart">
                            <img
                                src={
                                    inddata?.url?.startsWith("http")
                                        ? inddata.url
                                        : `${BASE_URL}${inddata?.url}`
                                }
                                alt="cart_img"
                                onError={(e) => (e.target.src = "https://projectbackend-d5qv.onrender.com/fallback-image.png")}
                            />

                            <div className="cart_btn">
                                <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                                <button className="cart_btn2" onClick={() => addtocart(inddata.id)}>Buy Now</button>
                            </div>
                        </div>
                        <div className="right_cart">
                            <h3>{inddata?.title?.shortTitle || "Product Title"}</h3>
                            <h4>{inddata?.title?.longTitle || "Product Description"}</h4>
                            <hr style={{ width: "100%", border: "1px solid #ccc" }} />
                            <p className="mrp">M.R.P. : ₹{inddata?.price?.mrp || 599}</p>
                            <p>Deal of the Day : <span>₹{inddata?.price?.cost || 499}</span></p>
                            <p>You Save: <span>₹{inddata?.price?.mrp - inddata?.price?.cost || 100}</span></p>
                            <div className="discount_box">
                                <h4>Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Within 7-8 Days</span></h4>
                                <p>Fastest Delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
                            </div>
                            <p className="description">
                                About the Item: <span>{inddata?.description}</span>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="circle">
                        <CircularProgress />
                        <h2>Loading...</h2>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cart;



















// import React, { useEffect, useState } from 'react';
// import "./cart.css";
// import { useParams } from 'react-router-dom';

// const Cart = () => {

//     const {id} = useParams("");
//     const [inddata,setInddata] = useState([]);
//     console.log(inddata);
//     // console.log(id);

//     const getinddata = async () => {
//         const res = await fetch(`/getproductsone/${id}`,{
//             method:"GET",
//             headers: {
//                 "Content-Type":"application/json"
//             }
//         });
//         const data = await res.json();
//          console.log(data);
//         // return data;

//         if(res.status !== 201){
//             console.log("no data available");
//         }else{
//             console.log("get data");
//             setInddata(data);
//         }
//     }

//     useEffect(()=>{
//         getinddata();
//     }, [id]);

//     return (
//         <div className='cart_section'>
//             <div className='cart_container'>
//                 <div className='left_cart'>
//                     {/* <img src={inddata.detailUrl } alt="cart_img" /> */}
//                     <img src={inddata?.detailUrl} alt="cart_img" onError={(e) => e.target.src = "/fallback-image.png"} />
//                     <div className='cart_btn'>
//                         <button className='cart_btn1'>Add to Cart</button>
//                         <button className='cart_btn2'>Buy Now</button>
//                     </div>
//                 </div>
//                 <div className='right_cart'>
//                     <h3>Premium Raw Tobacco for Authentic Experience</h3>
//                     <h4>Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience</h4>
//                     <hr style={{ width: "100%", border: "1px solid #ccc" }} />
//                     <p className='mrp'>M.R.P. : ₹599</p>
//                     <p>Deal of the Day : <span style={{ color: "" }}>₹499</span> </p>
//                     <p>You Save: <span style={{ color: "" }}>₹100</span></p>
//                     <div className='discount_box'>
//                         {/* <h5>Discount </h5> */}
//                         <h4>Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Within 7-8 Days</span> Details</h4>
//                         <p>Fastest Delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
//                     </div>
//                     <p className='description'>About the Item: <span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>Premium Raw Tobacco - Handpicked, Natural, and unprocessed for the True ExperiencePremium Raw Tobacco - Handpicked, Natural, and unprocessed for the True ExperiencePremium Raw Tobacco - Handpicked, Natural, and unprocessed for the True Experience</span></p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Cart;



