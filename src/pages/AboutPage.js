// src/About.js
import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-image">
          <img src={`${process.env.PUBLIC_URL}/images/ashley-dsouza.jpg`} alt="Your Icon" />
        </div>
        <div className="about-text">
          <h2>About Me</h2>
          <i>Technical Program Manager / Front End Engineer</i>
          <p>
            I'm a seasoned Technical Program Manager with a proven track record of delivering complex, high-impact projects on time and within budget. My expertise spans strategic planning, risk management, stakeholder alignment, and driving execution excellence across cross-functional teams. I'm a passionate advocate for continuous learning and believe in the power of technology to transform the way we work and live.
            <br /><br />
            That belief has led me to embark on a deep dive into front-end development, fueled by a desire to understand the intricacies of building engaging user experiences. I'm actively learning ReactJS, strengthening my foundations in HTML, CSS, and JavaScript, and building projects to put my knowledge into practice.  This portfolio reflects my journey as a lifelong learner and showcases my commitment to bridging the gap between strategic program leadership and the hands-on world of front-end development. I believe this blend of skills will allow me to deliver even more impactful and user-focused solutions in the future.
            <br /><br />
            I'm also a dedicated parent to two wonderful children, aged 5 and 2.5. They are my constant source of inspiration and motivation, and they've taught me invaluable lessons about adaptability, quick thinking and the importance of embracing the unexpected – skills that are relevant in the world of technology as they are in parenting!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;