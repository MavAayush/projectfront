import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ForgotPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    if (data.status === 201) {
          console.log("valid user");
    } else {
          history("*");   ///error page 
    }
  };

  const setval = (e) => setPassword(e.target.value);

  const sendpassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`/${id}/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    if (data.status === 201) {
      setPassword("");
      setMessage(true);
      toast.success("Password Updated Successfully", {
        position: "top-center",
        icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>,
        style: { background: "#fff", color: "#000" },
        progressStyle: { background: "#D7A86E" },
      });
      setTimeout(() => history("/login"), 1500);
    } else {
      toast.warning("Time Expired!, Try Again");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <>
      <section>
        <div className='forgot__container' style={{ backgroundImage: `url(${BASE_URL}/images/card4.jpg)` }}>
          <div className="forgot__form__data">
            <div className="forgot__form__heading">
              <h2>Enter Your New Password</h2>
            </div>
            <form>
              {message ? <p style={{ color: "#D7A86E", fontWeight: "bold" }} className="forgot__success">Password Updated Successfully</p> : ""}
              <div className="forgot__form__input">
                <label htmlFor="password">New Password</label>
                <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your New Password' />
              </div>
              <button className='forgot__btn__' onClick={sendpassword}>Send</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
