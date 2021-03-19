import {useState, useEffect, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {GlobalContext} from '../../GlobalProvider';
import firebase from 'firebase';
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DoneIcon from '@material-ui/icons/Done';
import AddTask from './AddTask';
import TaskInit from './TaskInit';
import TaskProgress from './TaskProgress';
import TaskFinished from './TaskFinished';
import EditTask from './EditTask';
import TaskEmpty from './TaskEmpty';
import Header from '../Header/Header';
import HeaderEmpty from '../Header/HeaderEmpty';


const MainProjects = ({appName,theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const {id} = useParams();
  const history = useHistory();
  const [myProjects, setMyProjects] = useState([])
  const [projectDetail, setProjectDetail] = useState([])
  const [items, setItems] = useState([])
  const [addItemBox, setAddItemBox] = useState(false)
  const [editItemBox, setEditItemBox] = useState(false)
  const [editItemBoxProgress, setEditItemBoxProgress] = useState(false)
  const [editData, setEditData] = useState({})


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

      await db.collection('projects').doc(id).collection('items').orderBy("date", "asc").onSnapshot(snapshot => (
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



  return (
    <main className={`main ${theme}`}>
      {
        id ? 
        (
          <>
          <Header appName={appName} theme={theme} collectionDetail={projectDetail} setCollectionDetail={setProjectDetail} />
         
      <section className="main__section">
        <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Init</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
            <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(!addItemBox)}><AddIcon /></button>
            {addItemBox && 
              <AddTask appName={appName} theme={theme} id={id} users={projectDetail.users} setItems={setItems} setAddItemBox={setAddItemBox}/>
            }
            {editItemBox && 
              <EditTask appName={appName} theme={theme} id={id} users={projectDetail.users} editData={editData} setItems={setItems} setEditItemBox={setEditItemBox}/>
            }
            {
              id && items.filter(item => item.stage === 'init')
                        .map(item => (
                          <TaskInit docId={id} taskId={item.id} title={item.title} desc={item.desc} date={item.date} users={item.users} stage={item.stage} theme={theme} setItems={setItems} setEditItemBox={setEditItemBox} setEditData={setEditData} />
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
            {editItemBoxProgress && 
              <EditTask appName={appName} theme={theme} id={id} users={projectDetail.users} editData={editData} setItems={setItems} setEditItemBox={setEditItemBoxProgress}/>
            }
            {
                id && items.filter(item => item.stage === 'progress')
                          .map(item => (
                            <TaskProgress docId={id} taskId={item.id} title={item.title} desc={item.desc} date={item.date} users={item.users} stage={item.stage} theme={theme} setItems={setItems} setEditItemBox={setEditItemBoxProgress} setEditData={setEditData} />
                          ))
              }
            
            </div>
          </article>
        </div>

        <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Finished</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
            <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(true)}><DoneIcon /></button>
            {
                id && items.filter(item => item.stage === 'finish')
                          .map(item => (
                            <TaskFinished docId={id} taskId={item.id} title={item.title} desc={item.desc} date={item.date} users={item.users} stage={item.stage} theme={theme} setItems={setItems} />
                          ))
              }
            </div>
          </article>
        </div>

      </section>
        </>
      )
      :
      (
      <>
        <HeaderEmpty appName={appName} theme={theme} title='AX Projects' />
       
        <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Init</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className={`button-icon ${appName}`}><AddIcon /></button>
            <TaskEmpty title="My task" desc="Your tasks in group are always highlight, you can easly find your task in group project" date="10.03.2020" users={[{name: userInfo.displayName,}]} theme={theme}/>
            <TaskEmpty title="Tell your friends" desc="Don't forget tells friend about this app" date="10.03.2020" users={[{name: 'Joe Doe'}]} theme={theme} />
            
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>In Progress</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
        <button className="button-icon projects"><TrendingUpIcon /></button>
            
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Finished</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
        <button className="button-icon projects"><DoneIcon /></button>
            
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
