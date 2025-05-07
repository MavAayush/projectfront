import React,{ useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoginContext } from '../context/ContextProvider';
import { useUser } from '@clerk/clerk-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderSuccess = () => {
  const { setAccount } = useContext(LoginContext);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If not signed in, redirect to login
    if (!isSignedIn || !user) {
      toast.warning("Please sign in to view order details", {
        position: "top-center",
      });
      navigate('/login');
      return;
    }

    // Clear cart from localStorage
    localStorage.removeItem("cartItems");

    // Optional: clear other related data
    localStorage.removeItem("totalAmount");

    // Reset account context cart
    setAccount(prev => ({
      ...prev,
      carts: []
    }));

    // Clear cart in the database
    const clearCart = async () => {
      try {
        await fetch("/clearcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "clerkid": user.id
          }
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    };

    clearCart();
  }, [isSignedIn, user, navigate, setAccount]);
  
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">
          <CheckCircleIcon fontSize="large" />
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>
          Thank you for your order. Your order has been received and will be processed as soon as possible.
        </p>
        <p className="delivery-message">
          Your order will be delivered within 7 business days.
        </p>
        <div className="payment-info">
          <p>Payment Method: <strong>Cash on Delivery</strong></p>
        </div>
        <div className="button-container">
          <NavLink to="/" className="continue-shopping-btn">
            Continue Shopping
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderSuccess; 