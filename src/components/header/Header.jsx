import React from "react";

const Header = () => {
  return (
    <div>
      <header className="header">
        <section className="header__logo-icons-container">
          <img
            className="header__logo"
            src="/images/logo.png"
            alt="logo image"
          />
          <figure className="header__icons-container">
            <img
              className="header__icon"
              src="/images/heart.svg"
              alt="heart icon"
            />
            <img
              className="header__icon"
              src="/images/messages.svg"
              alt="messages icon"
            />
          </figure>
        </section>
        <Carrousel />
      </header>
    </div>
  );
};

export default Header;
