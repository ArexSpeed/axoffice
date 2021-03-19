import {useState} from 'react'
import db from "../../firebase";

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

const AddTask = ({appName,theme,id, users, setAddItemBox, setItems}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [usersInTask, setUsersInTask] = useState([])
  const [taskDate, setTaskDate] = useState('')

  const deleteUserFromTask = (user) => {
    const deleting = usersInTask.filter(usr => usr.id !== user.id)
    setUsersInTask(deleting)
  }

  const showUsersToAdd = (  
    users.map((user, i) => (
      <>
      <span key={i}>
        <input type="checkbox" id={user.name} className="formBox__addUsers-input" onChange={(e) => e.target.checked ? setUsersInTask(prev => [...prev, user]) : deleteUserFromTask(user)} />
        <label key={i} htmlFor={user.name} className={`formBox__addUsers-label ${appName} ${theme}`}><span>{user.name}</span></label> 
        </span>
      </>
    )) 
  )
      
  const addTask = () => {
    db.collection("projects").doc(id).collection('items').add({
      title: newTaskTitle,
      desc: newTaskDesc,
      users: usersInTask,
      date: taskDate,
      stage: 'init',
      timestamp: new Date()
  })
  setNewTaskTitle('')
  setNewTaskDesc('')
  setUsersInTask([])
  setTaskDate('')
  setItems([])
  setAddItemBox(false)
    
  }
  return (
    <>
      <div className={`formBox__container ${theme}`}>
        <div className={`formBox__form ${theme}`}>
            <label htmlFor="title" className="formBox__label">Title</label>
             <input 
               type="text"
               className={`formBox__input ${theme}`} 
               value={newTaskTitle} 
               id="title"
               onChange={(e) => setNewTaskTitle(e.target.value)}
               /> 
               <label htmlFor="desc" className="formBox__label">Description</label>
             <textarea
               className={`formBox__textarea ${theme}`} 
               value={newTaskDesc} 
               id="desc"
               onChange={(e) => setNewTaskDesc(e.target.value)}
               /> 
                <label htmlFor="date" className="formBox__label">Date</label>
                <input 
                  type="date" 
                  className={`formBox__input date ${theme}`} 
                  id="date" 
                  name="trip-start"
                    value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                     />
                <label htmlFor="users" className="formBox__label">Users</label>
                <div className="formBox__addUsers">
                  {showUsersToAdd}
                </div>
                <div className="formBox__buttons">
                  <button className={`button-icon ${appName}`}>
                  <SaveAltIcon onClick={addTask} />
                  </button>

                  <button className={`button-icon-second ${appName}`} onClick={() => setAddItemBox(false)}>
                  <CancelIcon />
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddTask
