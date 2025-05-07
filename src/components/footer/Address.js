import React from 'react';
import './Address.css';

const Address = () => {
  return (
    <div className="footer-page-container3">
      <h1>Our Address</h1>
      <div className="footer-page-content3">
        <div className="address-container">
          <div className="address-info">
            <h2>Store</h2>
            <p>In Front of Mahila Thana</p>
            <p>Gola Bazar, Buxar</p>
            <p>Bihar, PIN 802101</p>
            <p>India</p>
            <p><strong>Phone:</strong> (+91) 9955059485</p>
            <p><strong>WhatsApp:</strong> (+91) 7903636638</p>
            <p><strong>Email:</strong> keshritobacco.store@gmail.com</p>
          </div>
                  
          <div className="address-hours">
            <h2>Business Hours</h2>
            <p><strong>Monday - Saturday:</strong> 9:00 AM - 7:00 PM EST</p>
            <p><strong>Sunday:</strong> Working Hours May Slightly Change</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address; 