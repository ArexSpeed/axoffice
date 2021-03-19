import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import firebase from 'firebase'
import db from "../../firebase";
import { GlobalContext } from "../../GlobalProvider";

const LeaveGroupBox = ({id, appName, setLeaveGroupBox}) => {
  const [{userInfo,usersList}, dispatch] = useContext(GlobalContext);
  const [userLeave, setUserLeave] = useState([])
  const history = useHistory();


  useEffect(() => {
    usersList.filter(user => user.name === userInfo.displayName && setUserLeave(user))
  }, [])

  const leaveGroup = () => {
    db.collection(appName).doc(id).update({
      users: firebase.firestore.FieldValue.arrayRemove(userLeave)
    })
    setLeaveGroupBox(false)
    history.push(`/${appName}`)
  }
  return (
    <div className={`main__actionBox ${appName}`}>
        <p style={{textAlign: 'center'}}>Do you want to leave this group?</p>
        <div>
        <button className={`main__title-button button-icon ${appName}`} onClick={leaveGroup}>OK</button>
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setLeaveGroupBox(false)}>NO</button>
        </div>
        </div>
  )
}

export default LeaveGroupBox
