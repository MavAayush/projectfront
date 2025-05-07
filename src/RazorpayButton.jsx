import React from "react";
import axios from "axios";

const RazorpayButton = ({ amount }) => {
  // Function to load the Razorpay script dynamically
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // 1. Create order on backend
      const { data } = await axios.post("http://localhost:8005/api/razorpay/createOrder", {
        amount: amount * 100, // Razorpay expects the amount in paisa (1 INR = 100 paisa)
      });

      // 2. Set up Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Public key from your Razorpay dashboard
        amount: data.amount, // Amount from the backend response
        currency: "INR",
        name: "Keshri Tobacco", // Your business name
        description: "Order Payment", // Description of the payment
        order_id: data.id, // Order ID returned from the backend
        handler: async function (response) {
          alert("Payment Successful!");
          console.log(response); // Response from Razorpay

          // Optional: Send payment response to the backend for signature verification
          await axios.post("http://localhost:8005/api/razorpay/verifySignature", {
            response,
          });
        },
        prefill: {
          name: "Customer", // Prefill name
          email: "customer@example.com", // Prefill email
          contact: "9999999999", // Prefill contact number
        },
        theme: {
          color: "#3399cc", // Customize the theme color of the Razorpay popup
        },
      };

      // 3. Open Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Payment failed. Please try again later.");
    }
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default RazorpayButton;
