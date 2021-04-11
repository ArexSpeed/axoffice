import {useState, useEffect, useContext} from 'react'
import firebase from 'firebase'
import db from "../../firebase";
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import { GlobalContext } from "../../GlobalProvider";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const AddUser = ({id,appName, setAddUserBox}) => {
  const [{usersList}, dispatch] = useContext(GlobalContext);
  const [searchUser, setSearchUser] = useState('')
  const [foundUser, setFoundUser] = useState([])
  const [helpBox, setHelpBox] = useState(false);

  useEffect(() => {
    usersList.filter(user => user.name === searchUser && setFoundUser(user))
  }, [searchUser])

  const addUser = () => {
    console.log('add', foundUser)
    db.collection(appName).doc(id).update({
      users: firebase.firestore.FieldValue.arrayUnion(foundUser)
    })
    setAddUserBox(false)
  }
  return (
    <div className={`header__actionBox ${appName}`}>
        <HelpIcon onClick={() => setHelpBox(!helpBox)}/>
        <div 
          onClick={() => setHelpBox(false)}
          className={`header__actionBox-search ${appName}`} 
        >
          <SearchOutlinedIcon />
          <input className={`header__actionBox-search input ${appName}`} type="text" placeholder="Find user" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
        </div>
      {helpBox && 
      (
        <p 
          onClick={() => setHelpBox(false)}
          style={{margin: '20px', fontSize: '12px'}}
        >If you want to find user you have to type the full name!</p>
      )
      }
      {searchUser && 
      (
        <>
        <p>{foundUser.name}</p>
        <div className="header__buttons">
        <button className={`header__button button-icon ${appName}`} onClick={addUser}><AddIcon /></button>
        <button className={`header__button button-icon ${appName}`} onClick={() => setAddUserBox(false)}>NO</button>
        </div>
        </>
      )
    }
       
        </div>
  )
}

export default AddUser
