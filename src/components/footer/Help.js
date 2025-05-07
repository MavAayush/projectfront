import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Help.css';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const navigate = useNavigate();


  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const faqs = [
    {
      question: "How do I verify my age?",
      answer: "As a tobacco retailer, we are required by law to verify that all customers are of legal age to purchase tobacco products. During checkout, you will be asked to provide your date of birth. For first-time purchases, we may require additional verification through a third-party age verification service."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, PayPal and cash on delivery. All transactions are secure and encrypted for your protection."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order has shipped, you will receive an email with tracking information. You can also view your order status and tracking information by logging into your account and visiting the 'Order History' section."
    },
    {
      question: "What is your return policy?",
      answer: "For health and safety reasons, we can only accept returns of tobacco products that are damaged, defective, or incorrectly shipped. Please refer to our Return Policy page for complete details."
    },
    {
      question: "How long will shipping take?",
      answer: "Shipping times vary depending on your location and chosen shipping method. Standard shipping typically takes 5-7 business days, while expedited shipping options are available for faster delivery. Please see our Shipping Policy for more information."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take your privacy seriously. We use industry-standard encryption and security measures to protect your personal and payment information. Please review our Privacy Policy for more details on how we collect, use, and protect your information."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'My Account' link at the top of the page, then select 'Create Account'. You'll need to provide your email address, create a password, and verify your age."
    },
    {
      question: "What should I do if my order arrives damaged?",
      answer: "If your order arrives damaged, please take photos of the damaged packaging and products, and contact our customer service team within 48 hours of delivery. We'll arrange for a replacement or refund."
    }
  ];

  return (
    <div className="footer-page-container9">
      <h1>Help Center</h1>
      <div className="footer-page-content9">
        <div className="help-tabs">
          <button
            className={activeTab === 'faq' ? 'active' : ''}
            onClick={() => setActiveTab('faq')}
          >
            Frequently Asked Questions
          </button>
          <button
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={() => {
              setActiveTab('contact');
              navigate('/contact-us');
            }}
          >
            Contact Support
          </button>
        </div>


        <div className="help-content">
          {activeTab === 'faq' && (
            <div className="faq-section">
              <p>Find answers to our most frequently asked questions below. If you don't see what you're looking for, please contact our customer support team.</p>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div
                      className={`faq-question ${expandedFaq === index ? 'active' : ''}`}
                      onClick={() => toggleFaq(index)}
                    >
                      {faq.question}
                      <span className="faq-icon">{expandedFaq === index ? '−' : '+'}</span>
                    </div>
                    {expandedFaq === index && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help; 