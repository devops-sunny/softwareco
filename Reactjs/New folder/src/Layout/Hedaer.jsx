import React from 'react';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <a
            href="https://www.softwareco.com/"
            className="custom-logo-link"
            rel="home"
          >
            <img
              width={257}
              height={50}
              src="https://www.softwareco.com/wp-content/uploads/2020/09/logo.png"
              className="custom-logo"
              alt="Software Co | Best Software Developer in Australia 2023."
              decoding="async"
            />
          </a>
        </div>
        <div className="contact-info">
          <span className="phone-icon">📞</span>
          <span className="phone-number">1300 585 888</span>
        </div>
      </header>
    </>
  );
};

export default Header;