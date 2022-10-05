import React from 'react'
import Logo from '../images/nations.png'
import Charts from '../images/charts.png'

const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage('main')}><img className="logo" src={Logo} alt="logo" /></button>
      <button onClick={() => setPage('charts')}><img className="logo" src={Charts} alt="logo" /></button>
    </nav>
  );
}

export default Navbar;