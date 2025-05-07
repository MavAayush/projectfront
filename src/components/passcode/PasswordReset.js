import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => setEmail(e.target.value);

  const sendLink = async (e) => {
    e.preventDefault();
    const res = await fetch("/sendpasswordlink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (data.status === 201) {
      setEmail("");
      setMessage(true);
    } else {
      toast.warning("Invalid User");
    }
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className='reset__container' style={{ backgroundImage: `url(${BASE_URL}/images/card4.jpg)` }}>
          <div className="reset__form__data">
            <div className="reset__form__heading">
              <h2>Enter Your Email</h2>
            </div>
            {message && <p className="reset__success">Password Reset Link Sent To Your Email</p>}
            <form>
              <div className="reset__form__input">
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email' />
              </div>
              <button className='reset__btn__' onClick={sendLink}>Send</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
