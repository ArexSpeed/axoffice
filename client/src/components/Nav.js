import React from 'react'
import {Link, useParams} from 'react-router-dom'
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const Nav = ({app}) => {

  return (
    <nav className={`nav ${app}`}>
      <ul className="nav-list">
        <li className={`${app === 'projects' ? "nav-item projects" : "nav-item"}`}>
          <Link to="/projects" className="nav-link">
            <ViewListIcon />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/lists" className="nav-link">
            <AssignmentIcon />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/budget" className="nav-link">
            <AccountBalanceIcon />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/calendar" className="nav-link">
            <CalendarTodayIcon />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
