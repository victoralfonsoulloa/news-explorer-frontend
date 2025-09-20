import React from "react";
import "../styles/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 News Explorer, Powered by NewsAPI
        </p>
        <div className="footer__links">
          <a href="/" className="footer__link">
            Inicio
          </a>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;