import React from 'react'
import Login from '../Login'
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const Nav = ({theme, setTheme}) => {
  return (
    <nav className="mainSite__nav">
      <img src="" alt="" />
      <ul className="mainSite__nav-ul">
        <li><a href="#apps" className={`mainSite__nav-link ${theme}`}>Apps</a></li>
        <li><Login size="small"/></li>
        <li>
          <button 
            className={`mainSite__nav-button-color ${theme}`}
            onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
          >
          <InvertColorsIcon />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
