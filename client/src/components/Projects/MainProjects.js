import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import firebase from 'firebase';
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DoneIcon from '@material-ui/icons/Done';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddUser from './AddUser';
import LeaveGroupBox from './LeaveGroupBox';
import AddTask from './AddTask';
import TaskInit from './TaskInit';


const MainProjects = ({appName,theme}) => {
  const {id} = useParams();
  const history = useHistory();
  const [myProjects, setMyProjects] = useState([])
  const [projectDetail, setProjectDetail] = useState([])
  const [editListName, setEditListName] = useState(false)
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [deleteBox, setDeleteBox] = useState(false)
  const [addItemBox, setAddItemBox] = useState(false)
  const [addUserBox, setAddUserBox] = useState(false)
  const [groupBox, setGroupBox] = useState(false)
  const [leaveGroupBox, setLeaveGroupBox] = useState(false)
  const [mobileIconBox, setMobileIconBox] = useState(false)

  useEffect(() => {
    setItems([])
    //filter project to find selected list by id
    async function fetchList(){
      await db.collection('projects').onSnapshot(snapshot => (
        snapshot.docs
        .filter(doc => doc.id === id ?
        setMyProjects([{
          id: doc.id,
          name: doc.data().name,
          users: doc.data().users,
          timestamp: doc.data().timestamp
        }]
        )
        : '')
      ))

      await db.collection('projects').doc(id).collection('items').onSnapshot(snapshot => (
        snapshot.docs.map(doc => 
          setItems(prev => 
            [...prev,
              {id: doc.id, 
               stage: doc.data().stage, 
               title: doc.data().title, 
               desc: doc.data().desc,
               date: doc.data().date,
               users: doc.data().users,
               timestamp: doc.data().timestamp
            }])
      )))
      } 
        fetchList();
  }, [id])
  console.log(items, 'item in project')
  useEffect(() => {
    myProjects.map(project => setProjectDetail(project))
  }, [myProjects])


  const updateListName = () => {
    setEditListName(false)
    db.collection('projects').doc(id).update({name: projectDetail.name})
  }

  const deleteList = (id) => {
    db.collection('projects').doc(id).delete()
    setDeleteBox(false)
    history.push('/projects')
  }

  return (
    <main className={`main ${theme}`}>
      {
        id ? 
        (
          <>
          <header className="main__header">
         {
           !editListName ?
           (
           <>
           <h1 className={`main__title ${appName} ${theme}`}>{projectDetail.name}</h1> 
           <button className={`main__title-button button-icon ${appName}`} onClick={() => setEditListName(true)}><EditIcon /></button> 
           </>
           )
           :
           (
            <>
            <form onSubmit={updateListName}>
            <input className={`main__title-input ${appName} ${theme}`} value={projectDetail.name} onChange={(e) => setProjectDetail({...projectDetail, name: e.target.value})} />
            </form>
            <button className={`main__title-button button-icon ${appName}`} onClick={updateListName}><DoneIcon /></button> 
            </>
           )
         }
        
          <button className={`main__title-button button-icon ${appName}`} onClick={() => setAddUserBox(!addUserBox)}><PersonAddIcon /></button>
          <div className="moreIcon-container">
            <button className={`main__title-button button-icon ${appName}`} onClick={() => setMobileIconBox(!mobileIconBox)}><MoreVertIcon /></button>
            {
              mobileIconBox &&
              <div className={`moreIcon-box ${theme}`}>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setGroupBox(!groupBox); setMobileIconBox(false)}}><PeopleOutlineIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setLeaveGroupBox(!leaveGroupBox); setMobileIconBox(false)}}><ExitToAppIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setDeleteBox(!deleteBox); setMobileIconBox(false)}}><DeleteIcon /></button>
              </div>
            }
        </div>
      </header>
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
            <p style={{fontStyle: 'italic'}}>Users in project</p>
        {projectDetail.users.map(user => <p>{user.name}</p>)}
      
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setGroupBox(false)}>OK</button>
        </div>
        ) 
      }
      {
        leaveGroupBox && <LeaveGroupBox id={id} appName={appName} setLeaveGroupBox={setLeaveGroupBox} />
      }
      <section className="main__section">
        <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Init</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
            <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(!addItemBox)}><AddIcon /></button>
            {addItemBox && 
              <AddTask appName={appName} theme={theme} id={id} users={projectDetail.users} setItems={setItems} setAddItemBox={setAddItemBox}/>
            }
              {
                id && items.filter(item => item.stage === 'init')
                          .map(item => (
                            <TaskInit docId={id} taskId={item.id} title={item.title} desc={item.desc} date={item.date} users={item.users} stage={item.stage} theme={theme} setItems={setItems} />
                          ))
              }
            </div>
          </article>
        </div>

        <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>In Progress</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
            <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(true)}><TrendingUpIcon /></button>
            
            <TaskInit theme={theme} />
              {/* {id && items.filter(item => item.stage === 'todo')
              .map(item => (
                <ItemTodo docId={id} itemId={item.id} name={item.name} stage={item.stage} theme={theme} setItems={setItems} />
              ))} */}
            </div>
          </article>
        </div>

        <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Finished</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
            <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(true)}><DoneIcon /></button>
            
            <TaskInit theme={theme} />
              {/* {id && items.filter(item => item.stage === 'todo')
              .map(item => (
                <ItemTodo docId={id} itemId={item.id} name={item.name} stage={item.stage} theme={theme} setItems={setItems} />
              ))} */}
            </div>
          </article>
        </div>

      </section>
        </>
      )
      :
      (
        <>
        <header className="main__header">
        <h1 className={`main__title projects ${theme}`}>AX Office</h1> <button className="main__title-button button-icon projects"><EditIcon /></button> <button className="main__title-button button-icon projects"><PersonAddIcon /></button>
      </header>
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Init</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className={`button-icon ${appName}`}><AddIcon /></button>
            <TaskInit theme={theme} />
            <TaskInit theme={theme} />
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 1</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 2</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 3</h5> <ArrowForwardIosIcon />
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>In Progress</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
        <button className="button-icon projects"><TrendingUpIcon /></button>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 1</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 2</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 3</h5> <ArrowForwardIosIcon />
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Finished</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
        <button className="button-icon projects"><DoneIcon /></button>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 1</h5> <DoneIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 2</h5> <DoneIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 3</h5> <DoneIcon />
            </div>
          </div>
        </article>
        </div>

      </section>
        </>
      )
      }
      
    </main>
  )
}

export default MainProjects
