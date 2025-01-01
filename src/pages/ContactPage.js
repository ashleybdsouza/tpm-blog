// src/Contact.js
import React from 'react';
import '../styles/App.css';



function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2>Contact</h2>
      <p>Feel free to connect with me on social media!</p>
      
      <div className="contact-links">
        <div className="social-icons">
          <a href="https://github.com/ashleybdsouza" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      </a>
          <a href="https://www.linkedin.com/in/ashleybdsouza/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;