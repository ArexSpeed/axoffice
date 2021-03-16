import {useState, useEffect, useContext} from 'react'
import firebase from 'firebase'
import db from "../../firebase";
import AddIcon from '@material-ui/icons/Add';
import { GlobalContext } from "../../GlobalProvider";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const AddUser = ({id, setAddUserBox}) => {
  const [{usersList}, dispatch] = useContext(GlobalContext);
  const [searchUser, setSearchUser] = useState('')
  const [foundUser, setFoundUser] = useState([])

  useEffect(() => {
    usersList.filter(user => user.name === searchUser && setFoundUser(user))
  }, [searchUser])

  const addUser = () => {
    console.log('add', foundUser)
    db.collection('lists').doc(id).update({
      users: firebase.firestore.FieldValue.arrayUnion(foundUser)
    })
    setAddUserBox(false)
  }
  return (
    <div className="main__actionBox lists">
        <div className="main__actionBox-search lists">
          <SearchOutlinedIcon />
          <input className="main__actionBox-search input lists" type="text" placeholder="Find user" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
      </div>
      {searchUser && 
      (
        <>
        <p>{foundUser.name}</p>
        <div>
        <button className="main__title-button button-icon lists" onClick={addUser}><AddIcon /></button>
        </div>
        </>
      )
    }
       
        </div>
  )
}

export default AddUser
