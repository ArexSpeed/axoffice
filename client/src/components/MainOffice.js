import React from 'react'
import {Link, useParams} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const MainOffice = () => {
  return (
    <main className="main">
      <h1 className="main__title office">Hello User! What do you want to do today?</h1>
        <section className="office-apps">
          <ul className="office-list">
            <div>
          <li className="office-item projects">
          <Link to="/projects" className="office-link">
            <ViewListIcon />
            <p className="office-link-name">Project</p>
          </Link>
        </li>
        <li className="office-item lists">
          <Link to="/lists" className="office-link">
            <AssignmentIcon />
            <span>List</span>
          </Link>
        </li>
        </div>
        <div>
        <li className="office-item budgets">
          <Link to="/budget" className="office-link">
            <AttachMoneyIcon />
            <span>Budget</span>
          </Link>
        </li>
        <li className="office-item calendars">
          <Link to="/calendar" className="office-link">
            <CalendarTodayIcon />
            <span>Calendar</span>
          </Link>
        </li>
        </div>
          </ul>
       
        </section>
    </main>
  )
}

export default MainOffice
