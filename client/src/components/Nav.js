import {useContext} from 'react'
import db from "../firebase";
import { GlobalContext } from "../GlobalProvider";
import { actionTypes } from "../reducer";
import {Link, useParams, useHistory} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

const Nav = ({appName}) => {
  const [{userInfo, theme}, dispatch] = useContext(GlobalContext);
  const history = useHistory();
  // console.log(userInfo)
  const changeTheme = () => {
    if(theme === 'dark') {
      dispatch({ type: actionTypes.SET_THEME, payload: 'light'});
      db.collection('users').doc(userInfo.uid).update({
      theme: 'light'
    })
    }
    if(theme === 'light') {
      dispatch({ type: actionTypes.SET_THEME, payload: 'dark'});
      db.collection('users').doc(userInfo.uid).update({
      theme: 'dark'
    })
    }
  };
  const logout = () => {
    localStorage.removeItem('userInfo')
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: null
    });
    history.push('/')
  }

  return (
    <nav className={`nav ${appName}`}>
      <div className="nav__user">
        <img src={userInfo.photoURL} alt="L" />
        <p className="nav__user-name">{userInfo.displayName}</p>
      </div>
      <ul className="nav-list">
      <li className={`nav-item ${theme}`}>
          <Link to="/" className="nav-link">
            <HomeIcon />
          </Link>
        </li>
        <li className={`${appName === 'projects' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/projects" className="nav-link">
            <ViewListIcon />
          </Link>
        </li>
        <li className={`${appName === 'lists' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/lists" className="nav-link">
            <AssignmentIcon />
          </Link>
        </li>
        <li className={`${appName === 'budgets' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/budgets" className="nav-link">
            <AttachMoneyIcon />
          </Link>
        </li>
        <li className={`${appName === 'folders' ? `nav-item active ${theme}` : `nav-item ${theme}`}`}>
          <Link to="/folders" className="nav-link">
            <FolderIcon />
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/settings" className="nav-link">
            <SettingsIcon />
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link color" onClick={changeTheme}>
            <InvertColorsIcon />
          </button>
        </li>

        <li className="nav-item">
          <button className="nav-link color" onClick={logout}>
            <ExitToAppIcon />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
