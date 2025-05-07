import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/ContextProvider';
import "./signup.css";

const BASE_URL = "https://projectbackend-d5qv.onrender.com";

const SignUp = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setUdata(() => {
            return {
                ...udata,
                [name]: value,
            }
        })
    }

    const navigate = useNavigate();
    const { account } = useContext(LoginContext);


    const senddata = async (e) => {
        e.preventDefault();

        // If the user is already logged in
        if (account) {
            toast.warning("You are already logged in", {
                position: "top-center",
                autoClose: 2000,
            });
            navigate("/");
            return;
        }

        const { fname, email, mobile, password, cpassword } = udata;
        const res = await fetch("register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            // window.alert("Invalid Registration");
            // console.log("Invalid Registration");
            toast.warning("Invalid Details", {
                position: "top-center",
            })
        } else {
            // window.alert("Registration Successful");
            // console.log("Registration Successful");
            toast.success("Registered Successfully", {
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
            setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
    }



    return (
        <section className='sign_section_x'>
            <div className='sign_container_x' style={{
                backgroundImage: `url(${BASE_URL}/images/card4.jpg)`,
            }}>
                <div className='sign_form_x'>
                    <form method='POST'>
                        <h1 style={{ color: '#fff' }}>Sign-Up</h1>
                        <div className='form_data_x'>
                            <label htmlFor="fname" style={{ color: '#fff' }}>Your Name</label>
                            <input type="text"
                                onChange={adddata}
                                value={udata.fname}
                                name="fname" id="fname" />
                        </div>
                        <div className='form_data_x'>
                            <label htmlFor="email" style={{ color: '#fff' }}>Email</label>
                            <input type="text"
                                onChange={adddata}
                                value={udata.email}
                                name="email" id="email" />
                        </div>
                        <div className='form_data_x'>
                            <label htmlFor="number" style={{ color: '#fff' }}>Mobile</label>
                            <input type="text"
                                onChange={adddata}
                                value={udata.mobile}
                                name="mobile" id="mobile" />
                        </div>
                        <div className='form_data_x'>
                            <label htmlFor="password" style={{ color: '#fff' }}>Password</label>
                            <input type="password"
                                onChange={adddata}
                                value={udata.password}
                                name="password" placeholder=" At least 6 characters" id="password" />
                        </div>
                        <div className='form_data_x'>
                            <label htmlFor="cpassword" style={{ color: '#fff' }}>Confirm Password</label>
                            <input type="password"
                                onChange={adddata}
                                value={udata.cpassword}
                                name="cpassword" id="cpassword" placeholder=" Enter same password" />
                        </div>
                        <button className='signin_btn_x' onClick={senddata}>Continue</button>
                        <div className='signin_info'>
                            <p style={{ color: '#fff' }}>Already have an account!</p>
                            <br />
                            <NavLink to="/login" style={{ color: '#fff', fontSize: '18px' }}>Sign In</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp;
