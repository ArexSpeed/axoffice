import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import db from "../../firebase";
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import AddUser from './AddUser';
import LeaveGroupBox from './LeaveGroupBox';

const Header = ({appName, theme, collectionDetail, setCollectionDetail}) => {
  const {id} = useParams()
  const history = useHistory();
  // const [budgetDetail, setBudgetDetail] = useState([])
  const [editBudgetName, setEditBudgetName] = useState(false)
  const [deleteBox, setDeleteBox] = useState(false)
  const [editData, setEditData] = useState({})
  const [addUserBox, setAddUserBox] = useState(false)
  const [groupBox, setGroupBox] = useState(false)
  const [leaveGroupBox, setLeaveGroupBox] = useState(false)
  const [moreIconBox, setMoreIconBox] = useState(false)

  const updateBudgetName = () => {
    setEditBudgetName(false)
    db.collection(appName).doc(id).update({name: collectionDetail.name})
  }

  const deleteList = (id) => {
    db.collection(appName).doc(id).delete()
    setDeleteBox(false)
    history.push(`/${appName}`)
  }

  return (
    <>
    <header className="main__header">
        {
         !editBudgetName ?
         (
         <>
         <h1 className={`main__title ${appName} ${theme}`}>{collectionDetail.name}</h1> 
         <button className={`main__title-button button-icon ${appName}`} onClick={() => setEditBudgetName(true)}><EditIcon /></button> 
         </>
         )
         :
         (
          <>
          <form onSubmit={updateBudgetName}>
          <input className={`main__title-input ${appName} ${theme}`} value={collectionDetail.name} onChange={(e) => setCollectionDetail({...collectionDetail, name: e.target.value})} />
          </form>
          <button className={`main__title-button button-icon ${appName}`} onClick={updateBudgetName}><DoneIcon /></button> 
          </>
         )
       }
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setAddUserBox(!addUserBox)}><PersonAddIcon /></button>
          <div className="moreIcon-container">
            <button className={`main__title-button button-icon ${appName}`} onClick={() => setMoreIconBox(!moreIconBox)}><MoreVertIcon /></button>
            {
              moreIconBox &&
              <div className={`moreIcon-box ${theme}`}>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setGroupBox(!groupBox); setMoreIconBox(false)}}><PeopleOutlineIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setLeaveGroupBox(!leaveGroupBox); setMoreIconBox(false)}}><ExitToAppIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setDeleteBox(!deleteBox); setMoreIconBox(false)}}><DeleteIcon /></button>
              </div>
            }
        </div>
      </header>
      {/* Header actions */}
      {deleteBox && 
        <div className={`main__actionBox ${appName}`}>
        <p style={{textAlign: 'center'}}>Do you want to remove this project?</p>
        <div>
        <button className={`main__title-button button-icon ${appName}`} onClick={() => deleteList(id)}>OK</button>
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setDeleteBox(false)}>NO</button>
        </div>
        </div>
      }
      {addUserBox && 
       <AddUser id={id} appName={appName} setAddUserBox={setAddUserBox}/>
      }
      {groupBox && 
        (
          <div className={`main__actionBox ${appName}`}>
            <p style={{fontStyle: 'italic'}}>Users in budget</p>
        {collectionDetail.users.map(user => <p>{user.name}</p>)}
      
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setGroupBox(false)}>OK</button>
        </div>
        ) 
      }
      {
        leaveGroupBox && <LeaveGroupBox id={id} appName={appName} setLeaveGroupBox={setLeaveGroupBox} />
      }
      </>
  )
}

export default Header
