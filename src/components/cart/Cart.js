import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/clerk-react";

const BASE_URL = "https://projectbackend-d5qv.onrender.com";

const Cart = () => {
    const { id } = useParams();
    const history = useNavigate();
    const { account, setAccount } = useContext(LoginContext);
    const { user, isSignedIn } = useUser();
    const [inddata, setInddata] = useState(null);

    const getinddata = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getproductsone/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
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
        setTimeout(getinddata, 1000);
    }, [id]);

    const addtocart = async (id) => {
        if (!isSignedIn || !user) {
            toast.warning("Sign in to proceed", { position: "top-center" });
            history("/login");
            return;
        }
        try {
            const checkres = await fetch(`${BASE_URL}/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "clerkid": user.id
                },
                body: JSON.stringify({ inddata })
            });
            const data1 = await checkres.json();
            if (checkres.status === 401 || !data1) {
                toast.error("Authentication failed", { position: "top-center" });
            } else {
                toast.success("Item Added to Cart", {
                    position: "top-center",
                    icon: <span style={{ color: "#facc15", fontSize: "20px" }}>✔</span>,
                    style: { background: "#fff", color: "#000" },
                    progressStyle: { background: "#facc15" },
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
            <style>
                {`
                    body {
                        font-family: 'Inter', sans-serif;
                        background: linear-gradient(135deg,rgb(230, 232, 241),rgb(241, 241, 241));
                        min-height: 100vh;
                        // margin: 50;
                    }
                    .cart_section {
                        padding: 80px 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .cart_container {
                        background: rgba(255, 255, 255, 0.9);
                        border-radius: 20px;
                        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                        backdrop-filter: blur(12px);
                        display: flex;
                        width: 90%;
                        max-width: 1200px;
                        padding: 40px;
                        margin-top:70px;
                        gap: 40px;
                    }
                    .left_cart {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .left_cart img {
                        width: 60%;
                        border-radius: 12px;
                        transition: transform 0.4s ease, box-shadow 0.4s ease;
                        object-fit: cover;
                    }
                    .left_cart img:hover {
                        transform: scale(1.08);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                    }
                    .cart_btn {
                        display: flex;
                        gap: 20px;
                        margin-top: 30px;
                    }
                    .cart_btn button {
                        padding: 12px 30px;
                        border: none;
                        text-align: center;
                        border-radius: 50px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .cart_btn1 {
                        background: linear-gradient(45deg, #facc15, #f97316);
                        color: #fff;
                        text-align: center;
                    }
                    .cart_btn1:hover {
                        background: linear-gradient(45deg, #eab308, #ea580c);
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    }
                    .cart_btn2 {
                        background: linear-gradient(45deg, #3b82f6, #1e40af);
                        color: #fff;
                        width:200px;
                        text-align: center;
                    }
                    .cart_btn2:hover {
                        background: linear-gradient(45deg, #2563eb, #1e3a8a);
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    }
                    .right_cart {
                        flex: 0.8;
                        background: #f8fafc;
                        border-radius: 12px;
                        padding: 30px;
                        border: 1px solid #e5e7eb;
                    }
                    .right_cart h3 {
                        font-size: 28px;
                        font-weight: 700;
                        color: #1f2937;
                        margin-bottom: 10px;
                    }
                    .right_cart h4 {
                        font-size: 20px;
                        font-weight: 500;
                        color: #4b5563;
                        margin-bottom: 20px;
                    }
                    .right_cart hr {
                        border: 1px solid #e5e7eb;
                        margin: 20px 0;
                    }
                    .mrp {
                        text-decoration: line-through;
                        color: #6b7280;
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    .right_cart p {
                        font-size: 18px;
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 10px;
                    }
                    .right_cart p span {
                        color: #b91c1c;
                        font-weight: 700;
                        font-size: 22px;
                    }
                    .discount_box h4 {
                        font-size: 16px;
                        color: #374151;
                        margin-bottom: 10px;
                    }
                    .discount_box h4 span {
                        color: #1f2937;
                        font-weight: 600;
                    }
                    .description {
                        font-size: 12px;
                        color: #4b5563;
                        line-height: 1.6;
                        margin-top: 20px;
                    }
                    .circle {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                    }
                    .Toastify__toast-container {
                        width: 80%;
                        max-width: 400px;
                        font-size: 14px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .Toastify__toast {
                        border-radius: 8px;
                        padding: 12px;
                        text-align: center;
                    }
                    .Toastify__close-button {
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        font-size: 18px;
                        color: #fff;
                    }
                    @media (max-width: 768px) {
                        .cart_section {
                            padding: 40px 10px;
                        }
                        .cart_container {
                            flex-direction: column;
                            padding: 20px;
                            gap: 20px;
                        }
                        .left_cart img {
                            width: 80%;
                        }
                        .cart_btn {
                            flex-direction: column;
                            width: 100%;
                        }
                        .cart_btn button {
                            width: 100%;
                            justify-content: center;
                        }
                        .right_cart {
                            padding: 20px;
                        }
                    }
                    @media (max-width: 480px) {
                        .cart_section {
                            padding-bottom: 100px;
                        }
                        .left_cart img {
                            width: 90%;
                        }
                        .cart_btn1, .cart_btn2 {
                            font-size: 14px;
                            padding: 10px;
                        }
                        .right_cart h3 {
                            font-size: 24px;
                        }
                        .right_cart h4 {
                            font-size: 18px;
                        }
                    }
                `}
            </style>
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
                                onError={(e) => (e.target.src = `${BASE_URL}/fallback-image.png`)}
                            />
                            <div className="cart_btn">
                                <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>
                                    <i className="fas fa-cart-plus"></i> Add to Cart
                                </button>
                                <button className="cart_btn2" onClick={() => addtocart(inddata.id)}>
                                    <i className="fas fa-bolt"></i> Buy Now
                                </button>
                            </div>
                        </div>
                        <div className="right_cart">
                            <h3>{inddata?.title?.shortTitle || "Product Title"}</h3>
                            <h4>{inddata?.title?.longTitle || "Product Description"}</h4>
                            <hr />
                            <p className="mrp">M.R.P. : ₹{inddata?.price?.mrp || 599}</p>
                            <p>Deal of the Day: <span>₹{inddata?.price?.cost || 499}</span></p>
                            <p>You Save: <span>₹{inddata?.price?.mrp - inddata?.price?.cost || 100}</span></p>
                            <div className="discount_box">
                                <h4>Delivery: <span>Within 7-8 Days</span></h4>
                                <h4>Fastest Delivery: <span>Tomorrow 11AM</span></h4>
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