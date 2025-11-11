import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>MERN Blog</h3>
        <p>Sharing knowledge, ideas, and inspiration through tech blogs.</p>

        <div className="social-links">
          <a href="https://github.com/Daniel-Dadzie" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/daniel-yaw-dadzie-87b113298" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:ddadzie120@gmail.com">Email</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Daniel Yaw Dadzie | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
