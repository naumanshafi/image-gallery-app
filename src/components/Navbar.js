import React, { useState } from 'react';
import '../css/Navbar.css';

function Navbar() {
  const [language, setLanguage] = useState('EN');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <a href="http://localhost:3000/" className="logo-link">
          Photo<span className="logo-highlight">Drag</span>
        </a>
      </div>
      <div className="language-cta">
        <div className="language">
          <div className="icon-world">
            <img className="icon-world-img" src="assets/vectors/world_icon.svg" alt="world" />
          </div>
          <div className="language-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="language-text">{language}</span>
            <div className="icon-chevron">
              <img className="icon-chevron-img" src="assets/vectors/chevron.svg" alt="chevron" />
            </div>
          </div>
          {isDropdownOpen && (
            <div className="language-dropdown">
              <div className="language-option" onClick={() => handleLanguageChange('EN')}>EN</div>
              <div className="language-option" onClick={() => handleLanguageChange('FR')}>FR</div>
              <div className="language-option" onClick={() => handleLanguageChange('ES')}>ES</div>
              <div className="language-option" onClick={() => handleLanguageChange('DE')}>DE</div>
            </div>
          )}
        </div>
        <div className="login-btn">
          <span className="login-text">Login</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
