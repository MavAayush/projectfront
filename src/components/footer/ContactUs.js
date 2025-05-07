import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToTerms: false
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    // For demo purposes, just show success message
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToTerms: false
      });
    }, 3000);
  };

  return (
    <div className="footer-page-container2">
      <h1>Contact Us</h1>
      
      <div className="footer-page-content2">
        <p>We value your feedback and are here to assist you with any questions or concerns. Please feel free to reach out to us using any of the methods below or by filling out our contact form.</p>
        
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <div className="contact-details">
            <div className="contact-item">
              <h3>Customer Service</h3>
              <p>Phone: (+91) 9955059485</p>
              <p>Email: keshritobacco.store@gmail.com</p>
              <p>Hours: Mon-Sat, 9AM-7PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          
          {formSubmitted && (
            <div className="success-message">
              Thank you for your message! We'll get back to you as soon as possible.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="return">Return/Refund</option>
                  <option value="product">Product Information</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms">
                I affirm that I am at least 21 years of age and agree to the <a href="/terms-and-conditions">Terms and Conditions</a> and <a href="/privacy-policy">Privacy Policy</a>.
              </label>
            </div>
            
            <button type="submit" className="submit-btn2">Submit Message</button>
          </form>
        </div>
        
        <div className="age-verification-notice">
          <p><strong>Note:</strong> Our products are intended for adults 21 years of age or older. We are committed to responsible retailing and comply with all applicable laws regarding age verification.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 