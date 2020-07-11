import React from 'react';
import './Header.scss';
import Logo from './img/country-currencies.svg'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img className="header-logo" src={Logo} alt="logo" />
        <h3 className="header-text">
          Currency Exchange
        </h3>
      </div>
    </header>
  )
}

export default Header;