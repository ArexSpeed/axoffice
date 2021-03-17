import {useState, useEffect, useContext} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import firebase from 'firebase'
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import SidebarBox from './SidebarBox';

const SidebarProjects = ({theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [projects, setProjects] = useState([])
  const [userProjects, setUserProjects] = useState([])
  const history = useHistory();
  
  useEffect(() => {

   const unsubscribe = db.collection('projects').onSnapshot(snapshot => (
      setProjects(
        snapshot.docs.map(doc => ({
          id: doc.id, 
          name: doc.data().name,
          users: doc.data().users,
          timestamp: doc.data().timestamp,
        }))
      )
    ))
    return () => {
      unsubscribe();
    };
  }, [])

  useEffect(() => {
    setUserProjects([])
    projects.filter(projetc => 
      projetc.users.find(name => name.name === userInfo.displayName) ? setUserProjects(prev => [...prev,projetc]) : ''
    )
   }, [projects])

   const addProject = () => {

    db.collection("projects").add({
        name: 'New Project',
        users: [{
          id: userInfo.uid,
          name: userInfo.displayName
        }],
        timestamp: new Date(),
        timestampf: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

   return (
    <>
    {userProjects.length >=1 ?
    (
      <section className={`sidebar projects ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Projects
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addProject}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          {userProjects.sort((a,b) => b.timestamp - a.timestamp)
          .map(list => (
            <SidebarBox key={list.id} id={list.id} name={list.name} users={list.users} theme={theme} />
            ))}
        </section>
      </section>
    )
    :
    (
      <section className={`sidebar projects ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Projects
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addProject}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
         
        <p>Add your first list</p>
        </section>
      </section>
    )  
  }
      
    </>
  )
}

export default SidebarProjects
