import {useState} from 'react'
import db from "../../firebase";

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

const EditTask = ({appName,theme,id, editData, setItems, setEditItemBox}) => {
  const taskId = editData.taskId
  const [editTitle, setEditTitle] = useState(editData.title)
  const [editDesc, setEditDesc] = useState(editData.desc)
  const [editDate, setEditDate] = useState(editData.date)
 

  // const deleteUserFromTask = (user) => {
  //   const deleting = usersInTask.filter(usr => usr.id !== user.id)
  //   setUsersInTask(deleting)
  // }

  // const showUsersToAdd = (  
  //   users.map((user, i) => (
  //     <>
  //     <span key={i}>
  //       <input type="checkbox" id={user.name} className="formBox__addUsers-input" onChange={(e) => e.target.checked ? setUsersInTask(prev => [...prev, user]) : deleteUserFromTask(user)} />
  //       <label key={i} htmlFor={user.name} className={`formBox__addUsers-label ${appName} ${theme}`}><span>{user.name}</span></label> 
  //       </span>
  //     </>
  //   )) 
  // )
      
  const editTask = () => {
    db.collection("projects").doc(id).collection('items').doc(taskId).update({
      title: editTitle,
      desc: editDesc,
      date: editDate,
  })
  setEditTitle('')
  setEditDesc('')
  // setUsersInTask([])
  setEditDate('')
  setItems([])
  setEditItemBox(false)
    
  }
  return (
    <>
      <div className={`formBox__container ${theme}`}>
        <div className={`formBox__form ${theme}`}>
            <label htmlForm="title" className="formBox__label">Title</label>
             <input 
               type="text"
               className={`formBox__input ${theme}`} 
               value={editTitle} 
               id="title"
               onChange={(e) => setEditTitle(e.target.value)}
               /> 
               <label htmlFor="desc" className="formBox__label">Description</label>
             <textarea
               className={`formBox__textarea ${theme}`} 
               value={editDesc} 
               id="desc"
               onChange={(e) => setEditDesc(e.target.value)}
               /> 
                <label htmlFor="date" className="formBox__label">Date</label>
                <input 
                  type="date" 
                  className={`formBox__input date ${theme}`} 
                  id="date" 
                  name="trip-start"
                    value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                     />
                <label htmlFor="users" className="formBox__label">Users</label>
                <div className="formBox__addUsers">
                  {/* {showUsersToAdd} */}
                </div>
                <div className="formBox__buttons">
                  <button className={`button-icon ${appName}`}>
                  <SaveAltIcon onClick={editTask} />
                  </button>

                  <button className={`button-icon-second ${appName}`} onClick={() => setEditItemBox(false)}>
                  <CancelIcon />
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditTask
