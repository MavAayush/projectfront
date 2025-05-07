import React from 'react';
import './ReturnPolicy.css';

const ReturnPolicy = () => {
  return (
    <div className="footer-page-container7">
      <h1>Return Policy</h1>
      
      <div className="footer-page-content7">
        <section className="return-section">
        
          <p className="return-intro">
            At Keshri Store, we want you to be completely satisfied with your purchase. 
            This Return Policy outlines our procedures for returns, refunds, and exchanges 
            to ensure a smooth experience in case you're not satisfied with your order.
          </p>
          
          <div className="return-notice">
            <p><strong>NOTE:</strong> Due to the nature of our products, we have a limited return policy. Please read this policy carefully before making a purchase.</p>
          </div>
          
          <h2>1. Return Eligibility</h2>
          <p>
            We accept returns for the following reasons:
          </p>
          <ul>
            <li>Damaged products received in shipping</li>
            <li>Defective products</li>
            <li>Incorrectly shipped products (items different from what you ordered)</li>
            <li>Unopened, unused products in original packaging (subject to restocking fee)</li>
          </ul>
          
          <p>
            We <strong>do not</strong> accept returns for:
          </p>
          <ul>
            <li>Used or opened products (unless defective)</li>
            <li>Products returned more than 14 days after delivery</li>
            <li>Products that have been altered or modified in any way</li>
            <li>Products specifically marked as "Final Sale" or "Non-Returnable"</li>
          </ul>
          
          <h2>2. Return Process</h2>
          <p>
            To initiate a return, please follow these steps:
          </p>
          
          <div className="process-steps">
            <div className="process-step">
              <h3>Contact Customer Service</h3>
              <p>
                Contact our customer service team at keshritobacco.store@gmail.com or (+91) 9955059485 within 7 days of receiving your order. Please include your order number, the items you wish to return, and the reason for the return.
              </p>
            </div>
            
            <div className="process-step">
              <h3>Receive Return Authorization</h3>
              <p>
                Our team will review your request and, if approved, will provide you with a Return ID and return instructions via email.
              </p>
            </div>
            
            <div className="process-step">
              <h3>Package Your Return</h3>
              <p>
                Package the items securely in their original packaging if possible. Include any documentation provided in the return instructions.
              </p>
            </div>
            
            <div className="process-step">
              <h3>Refund Processing</h3>
              <p>
                Once we receive and inspect your return, we will process your refund or exchange. Please allow 7-14 business days for the refund to appear on your account.
              </p>
            </div>
          </div>
          
          <h2>3. Refund Information</h2>
          <p>
            Refunds will be issued to the original payment method used for the purchase. The following conditions apply:
          </p>
          
          <div className="return-info-box">
            <h3>Refund Breakdown</h3>
            <ul>
              <li><strong>Full refund:</strong> For damaged, defective, or incorrectly shipped items</li>
              <li><strong>Partial refund:</strong> For unopened, unused items in original packaging (15% restocking fee may apply)</li>
              <li><strong>Shipping costs:</strong> Original shipping costs are non-refundable unless the return is due to our error</li>
              <li><strong>Return shipping costs:</strong> At customer's expense unless the return is due to our error</li>
            </ul>
          </div>
          
          <h2>4. Exchanges</h2>
          <p>
            If you prefer an exchange rather than a refund, please specify this when contacting our customer service team. Exchanges are subject to product availability. If the replacement item is more expensive than the original, you will be responsible for paying the difference.
          </p>
          
          <h2>5. Damaged or Defective Items</h2>
          <p>
            If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos of the damaged product and packaging. This will help us process your claim more efficiently.
          </p>
          <p>
            For defective items, please provide a detailed description of the issue you're experiencing. Our team may provide troubleshooting assistance before approving a return.
          </p>
          
          <h2>6. Cancellations</h2>
          <p>
            Orders can be canceled only if they have not yet been shipped. To request a cancellation, please contact our customer service team as soon as possible with your order number. If your order has already been shipped, you will need to follow the standard return process.
          </p>
          
          <h2>7. Contact Information</h2>
          <p>
            If you have any questions or concerns about our Return Policy, please contact our customer service team:
          </p>
          <address>
            Keshri Store<br />
            In Front of Mahila Thana<br />
            Gola Bazar, Buxar<br />
            Bihar, PIN 802101<br />
            Email: keshritobacco.store@gmail.com<br />
            Phone: (+91) 9955059485<br />
            Hours: Monday-Saturday, 9 AM - 7 PM EST
          </address>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy; 