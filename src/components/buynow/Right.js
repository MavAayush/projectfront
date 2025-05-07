import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Right = ({ iteam }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    totalAmount();
  }, [iteam])

  const totalAmount = () => {
    let price = 0;
    iteam.forEach(item => {
      price += item.price.cost * (item.quantity || 1);
    });
    setPrice(price);
  };

  const handleProceedToBuy = () => {
    localStorage.setItem('cartItems', JSON.stringify(iteam));
    navigate('/order-confirmation');
  };

  return (
    <div className='right_buy'>
      <img src="" alt="" />
      <div className='cost_right'>
        <p>Your order is eligible for FREE Delivery</p><br />
        <span style={{ color: "#565959" }}>Select this option at checkout</span>
        <h3>Sub Total ({iteam.length} items): <span style={{ fontweight: 700 }}>₹{price}.00</span></h3>
        <button className='rightbuy_btn' onClick={handleProceedToBuy}>Proceed to Buy</button>
      </div>
    </div>
  )
}

export default Right



































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import RenderRazorpay from './RenderRazorpay';

// const Right = ({ iteam }) => {
//   const [displayRazorpay, setDisplayRazorpay] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({
//     orderId: null,
//     currency: null,
//     amount: null,
//   });
//   const [price, setPrice] = useState(0);

//   useEffect(() => {
//     totalAmount();
//   }, [iteam]);

//   const totalAmount = () => {
//     let total = 0;
//     iteam.forEach(item => {
//       total += item.price.cost * (item.quantity || 1);
//     });
//     setPrice(total);
//   };

//   const handleCreateOrder = async (amount, currency) => {
//     console.log("Creating Razorpay order...", process.env.REACT_APP_RAZORPAY_KEY_ID);
//     try {
//       const { data } = await axios.post('http://localhost:8005/order', {
//         amount: amount * 100, // convert to paisa
//         currency,
//       });

//       console.log("Razorpay order created:", data);

//       if (data && data.id) {
//         setOrderDetails({
//           orderId: data.id,
//           currency: data.currency,
//           amount: data.amount,
//         });
//         setDisplayRazorpay(true);
//       } else {
//         alert('Order creation failed.');
//       }
//     } catch (error) {
//       console.error('Error creating order:', error);
//       alert('Something went wrong while creating order.');
//     }
//   };

//   return (
//     <div className='right_buy'>
//       <div className='cost_right'>
//         <p>Your order is eligible for FREE Delivery</p><br />
//         <span style={{ color: '#565959' }}>Select this option at checkout</span>
//         <h3>
//           Sub Total ({iteam.length} items):{' '}
//           <span style={{ fontWeight: 700 }}>₹{price}.00</span>
//         </h3>
//         <button
//           className='rightbuy_btn'
//           onClick={() => handleCreateOrder(price, 'INR')}
//         >
//           Proceed to Buy
//         </button>
//       </div>

//       {displayRazorpay && orderDetails.orderId && (
//         <RenderRazorpay
//           amount={orderDetails.amount}
//           currency={orderDetails.currency}
//           orderId={orderDetails.orderId}
//           const keyId = "rzp_test_OS7Xto3ROL3qvy"
//         />
//       )}
//     </div>
//   );
// };

// export default Right;




