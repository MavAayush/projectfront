import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/header/Navbar';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';

import AboutUs from './components/footer/AboutUs';
import ContactUs from './components/footer/ContactUs';
import Address from './components/footer/Address';
import TermsAndConditions from './components/footer/TermsAndConditions';
import ShippingPolicy from './components/footer/ShippingPolicy';
import ReturnPolicy from './components/footer/ReturnPolicy';
import PrivacyPolicy from './components/footer/PrivacyPolicy';
import Help from './components/footer/Help';

import Sign_in from './components/signup_sign/Sign_in';
import SignUp from './components/signup_sign/SignUp';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';


import OrderConfirmation from './components/orderconfirmation/OrderConfirmation';
import OrderSuccess from './components/orderconfirmation/OrderSuccess';



import PasswordReset from './components/passcode/PasswordReset';
import ForgotPassword from './components/passcode/ForgotPassword';
import Error from './components/passcode/Error';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import Clerk from './components/signup_sign/Clerk';



function App() {


  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])


  return (
    <>
      {
        data ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Maincomp />} />
              <Route path="/login" element={<Clerk></Clerk>} />
              <Route path="/register" element={<Clerk></Clerk>} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
              <Route path="/clerk" element={<Clerk></Clerk>} />



              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/ordersuccess" element={<OrderSuccess />} />



              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/address" element={<Address />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/help" element={<Help />} />

              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </>
        ):(
          <div className='circle'>
            <CircularProgress className="custom-loader"/>
            <h2>Loading...</h2>
          </div>
        )
   }


    </>
  );
}

export default App;




