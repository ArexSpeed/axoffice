import React from 'react'
import Login from '../Login'

const Nav = () => {
  return (
    <nav className="mainSite__nav">
      <img src="" alt="" />
      <ul className="mainSite__nav-ul">
        <li><a href="#apps" className={`mainSite__nav-link light`}>Apps</a></li>
        <li><Login /></li>
      </ul>
    </nav>
  )
}

export default Nav
