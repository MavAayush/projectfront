import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "https://projectbackend-d5qv.onrender.com";

const Sign_in = () => {

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });
    console.log(logdata);

    const { account, setAccount } = useContext(LoginContext);
    const history = useNavigate();

    const adddata = (e) => {
        const { name, value } = e.target;
        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };


    const senddata = async (e) => {
        e.preventDefault();

        // If the user is already logged in, show a message and redirect to home
        if (account) {
            toast.warning("You are already logged in", {
                position: "top-center",
            });
            history("/");
            return;
        }

        const { email, password } = logdata;
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 400 || !data) {
            // window.alert("Invalid Login");
            console.log("Invalid Login");
            toast.warning("Invalid Details", {
                position: "top-center",
            })

        } else {
            // window.alert("Login Successful");
            console.log("Login Successful");
            setAccount(data);
            toast.success("Sign In Successful", {
                position: "top-center",
                icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>,
                style: {
                    background: "#fff",
                    color: "#000",
                },
                progressStyle: {
                    background: "#D7A86E",
                },
            });
            setData({ ...logdata, email: "", password: "" });

            setTimeout(() => {
                history("/");
            }, 1500);
        }
    }

    return (
        <>
            <section className='sign_section_x'>
                <div className='sign_container_x' style={{
                    backgroundImage: `url(${BASE_URL}/images/card4.jpg)`,
                }}>
                    <div className='sign_form_x'>
                        <form method='POST'>
                            <h1 style={{ color: '#fff' }}>Sign-In</h1>
                            <div className='form_data_x'>
                                <label htmlFor="email" style={{ color: '#fff' }}>Email</label>
                                <input type="text"
                                    onChange={adddata}
                                    value={logdata.email}
                                    name="email" id="email" />
                            </div>
                            <div className='form_data_x'>
                                <label htmlFor="password" style={{ color: '#fff' }}>Password</label>
                                <input type="password"
                                    onChange={adddata}
                                    value={logdata.password}
                                    name="password" placeholder=" At least 6 characters" id="password" />
                            </div>
                            <button className='signin_btn_x' onClick={senddata}>Continue</button>
                            {/* <p style={{ color: 'white',fontWeight:"bold" }}>Forgot Password <NavLink to="/password-reset" style={{ color: '#d7a86e',marginLeft:"10px" }}> Click Here</NavLink></p> */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                                <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>Forgot Password?</p>
                                <NavLink to="/password-reset" style={{ color: '#d7a86e', fontWeight: 'bold', textDecoration: 'underline' }}>
                                    Click Here
                                </NavLink>
                            </div>
                        </form>
                    </div>
                    <div className='create_accountinfo_x'>
                        <p>New to keshri Traders!</p>
                        <NavLink to="/register"><button>Create Your Account</button></NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sign_in
