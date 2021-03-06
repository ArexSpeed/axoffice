import {useState, useEffect, useContext} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import firebase from 'firebase'
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import SidebarBox from './SidebarBox';

const SidebarLists = ({appName,theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [lists, setLists] = useState([])
  const [userLists, setUserLists] = useState([])
  const history = useHistory();
  
  useEffect(() => {

   const unsubscribe = db.collection('lists').onSnapshot(snapshot => (
      setLists(
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
    setUserLists([])
    lists.filter(list => 
      list.users.find(name => name.name === userInfo.displayName) ? setUserLists(prev => [...prev,list]) : ''
    )
   }, [lists])


  const addList = () => {
    const idRand = Math.round(Math.random()*10000);
    db.collection("lists").add({
        name: 'New List',
        id: idRand,
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
    {userLists.length >=1 ?
    (
      <section className={`sidebar ${appName} ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Lists
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addList}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          {userLists.sort((a,b) => b.timestamp - a.timestamp)
          .map(list => (
            <SidebarBox key={list.id} id={list.id} name={list.name} users={list.users} theme={theme} />
            ))}
        </section>
      </section>
    )
    :
    (
      <section className={`sidebar ${appName} ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Lists
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addList}><AddIcon /></button>
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

export default SidebarLists
