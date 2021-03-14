import React from 'react'
import {Link, useParams} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const Nav = ({app, theme, setTheme}) => {

  return (
    <nav className={`nav ${app}`}>
      <ul className="nav-list">
      <li className={`nav-item ${theme}`}>
          <Link to="/" className="nav-link">
            <HomeIcon />
          </Link>
        </li>
        <li className={`${app === 'projects' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/projects" className="nav-link">
            <ViewListIcon />
          </Link>
        </li>
        <li className={`${app === 'lists' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/lists" className="nav-link">
            <AssignmentIcon />
          </Link>
        </li>
        <li className={`${app === 'budget' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/budget" className="nav-link">
            <AttachMoneyIcon />
          </Link>
        </li>
        <li className={`${app === 'calendar' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/calendar" className="nav-link">
            <CalendarTodayIcon />
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link color" onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
            <InvertColorsIcon />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
