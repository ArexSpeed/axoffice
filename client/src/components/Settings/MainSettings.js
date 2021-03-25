import {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import db from "../../firebase";
import {GlobalContext} from '../../GlobalProvider';
import { actionTypes } from "../../reducer";
import DeleteIcon from '@material-ui/icons/Delete';


const MainSettings = () => {
  const [{userInfo, theme}, dispatch] = useContext(GlobalContext);
  const [deleteBox, setDeleteBox] = useState(false)
  const history = useHistory()

  const deleteUser = () => {
    db.collection('users').doc(userInfo.uid).delete();
    console.log(userInfo.uid, userInfo.displayName)
    localStorage.removeItem('userInfo')
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: null
    });
    setDeleteBox(false)
    history.push('/')
  }
  return (
    <>
      <main className={`main ${theme}`}>
      <h1 className={`header__title ${theme}`}>Settings</h1> 
     
        <span className={`main__section-title ${theme}`}>Delete Account {"   "}</span>
        <button className="button-icon red" onClick={() => setDeleteBox(!deleteBox)}><DeleteIcon /></button>
          {deleteBox &&
          <div className={`header__actionBox office`}>
          <p style={{textAlign: 'center'}}>Do you want to remove your account?</p>
          <div>
          <button className={`header__button button-icon office`} onClick={() => deleteUser()}>OK</button>
          <button className={`header__button button-icon office`} onClick={() => setDeleteBox(false)}>NO</button>
          </div>
          </div>
          }
           <section className="main__section">
        </section>
      </main>
    </>
  )
}

export default MainSettings
