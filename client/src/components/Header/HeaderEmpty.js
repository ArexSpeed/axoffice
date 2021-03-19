
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const HeaderEmpty = ({appName, theme, title}) => {
  return (
    <header className="header">
        <h1 className={`header__title ${appName} ${theme}`}>{title}</h1>
         <button className={`header__button button-icon ${appName}`}><EditIcon /></button> 
         <button className={`header__button button-icon ${appName}`}><PersonAddIcon /></button>
    </header>
  )
}

export default HeaderEmpty
