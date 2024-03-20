import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { CiMenuBurger } from "react-icons/ci";

function Header() {
  return (
  <>
  <nav>
    <div className="container nav_container">
      <Link to='/' className='nav_logo'>
        <img src={Logo} alt="Navbar Logo" />
      </Link>
    
  <ul className="nav_menu">
<li><Link to="/profile/sfdfs">Ernest Achiever</Link></li>
<li><Link to="/create">Create Post</Link></li>
<li><Link to="/authors">Authors</Link></li>
<li><Link to="/logout">Logout</Link></li>
</ul>
<button className="nav_toggle-btn">
<CiMenuBurger/>
</button> </div> </nav>

  </>
  )
}

export default Header
