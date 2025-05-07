import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";
import "./signup.css";

const BASE_URL = "https://projectbackend-d5qv.onrender.com";

const SignUp = () => {
    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setUdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();
    const { account } = useContext(LoginContext);

    const senddata = async (e) => {
        e.preventDefault();
        console.log("senddata called", udata);

        if (account) {
            toast.warning("You are already logged in", {
                position: "top-center",
                autoClose: 2000,
            });
            navigate("/");
            return;
        }

        const { fname, email, mobile, password, cpassword } = udata;

        // Client-side validation
        if (!fname || !email || !mobile || !password || !cpassword) {
            toast.warning("Please fill all fields", { position: "top-center" });
            return;
        }
        if (password !== cpassword) {
            toast.warning("Passwords do not match", { position: "top-center" });
            return;
        }

        try {
            console.log("Sending fetch request with data:", { fname, email, mobile, password, cpassword });
            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fname,
                    email,
                    mobile,
                    password,
                    cpassword,
                }),
            });
            console.log("Fetch response status:", res.status);

            let data;
            try {
                data = await res.json();
                console.log("Fetch response data:", data);
            } catch (jsonError) {
                console.error("JSON parsing error:", jsonError);
                data = { message: "Invalid response from server" };
            }

            if (res.status === 422 || !data) {
                console.log("Invalid Registration");
                toast.warning(data.message || "Invalid Details", {
                    position: "top-center",
                });
            } else {
                console.log("Registration Successful");
                toast.success("Registered Successfully", {
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
                setUdata({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
                setTimeout(() => {
                    console.log("Navigating to /login");
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.error("Fetch error:", error.message);
            toast.error(error.message || "An error occurred. Please try again.", {
                position: "top-center",
            });
        }
    };

    return (
        <section className="sign_section_x">
            <ToastContainer />
            <div className="sign_container_x" style={{ backgroundImage: `url(${BASE_URL}/images/card4.jpg)` }}>
                <div className="sign_form_x">
                    <form onSubmit={senddata}>
                        <h1 style={{ color: "#fff" }}>Sign-Up</h1>
                        <div className="form_data_x">
                            <label htmlFor="fname" style={{ color: "#fff" }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                onChange={adddata}
                                value={udata.fname}
                                name="fname"
                                id="fname"
                            />
                        </div>
                        <div className="form_data_x">
                            <label htmlFor="email" style={{ color: "#fff" }}>
                                Email
                            </label>
                            <input
                                type="email"
                                onChange={adddata}
                                value={udata.email}
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="form_data_x">
                            <label htmlFor="mobile" style={{ color: "#fff" }}>
                                Mobile
                            </label>
                            <input
                                type="text"
                                onChange={adddata}
                                value={udata.mobile}
                                name="mobile"
                                id="mobile"
                            />
                        </div>
                        <div className="form_data_x">
                            <label htmlFor="password" style={{ color: "#fff" }}>
                                Password
                            </label>
                            <input
                                type="password"
                                onChange={adddata}
                                value={udata.password}
                                name="password"
                                placeholder="At least 6 characters"
                                id="password"
                            />
                        </div>
                        <div className="form_data_x">
                            <label htmlFor="cpassword" style={{ color: "#fff" }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                onChange={adddata}
                                value={udata.cpassword}
                                name="cpassword"
                                placeholder="Enter same password"
                                id="cpassword"
                            />
                        </div>
                        <button type="submit" className="signin_btn_x">
                            Continue
                        </button>
                        <div className="signin_info">
                            <p style={{ color: "#fff" }}>Already have an account!</p>
                            <br />
                            <NavLink to="/login" style={{ color: "#fff", fontSize: "18px" }}>
                                Sign In
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;