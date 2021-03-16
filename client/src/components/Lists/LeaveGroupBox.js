import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import firebase from 'firebase'
import db from "../../firebase";
import { GlobalContext } from "../../GlobalProvider";

const LeaveGroupBox = ({id, setLeaveGroupBox}) => {
  const [{userInfo,usersList}, dispatch] = useContext(GlobalContext);
  const [userLeave, setUserLeave] = useState([])
  const history = useHistory();


  useEffect(() => {
    usersList.filter(user => user.name === userInfo.displayName && setUserLeave(user))
  }, [])

  const leaveGroup = () => {
    db.collection('lists').doc(id).update({
      users: firebase.firestore.FieldValue.arrayRemove(userLeave)
    })
    setLeaveGroupBox(false)
    history.push('/lists')
  }
  return (
    <div className="main__actionBox lists">
        <p>Do you want leave this group?</p>
        <button className="main__title-button button-icon lists" onClick={leaveGroup}>OK</button>
        </div>
  )
}

export default LeaveGroupBox
