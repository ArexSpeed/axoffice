import {useState, useEffect, useContext} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import firebase from 'firebase'
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import SidebarBox from './SidebarBox';

const SidebarFolders = ({appName,theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [folders, setFolders] = useState([])
  const [userFolders, setUserFolders] = useState([])
  
  useEffect(() => {

   const unsubscribe = db.collection('folders').onSnapshot(snapshot => (
      setFolders(
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
    setUserFolders([])
    folders.filter(folder => 
      folder.users.find(name => name.name === userInfo.displayName) ? setUserFolders(prev => [...prev,folder]) : ''
    )
   }, [folders])

   const addFolder = () => {

    db.collection("folders").add({
        name: 'New Folder',
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
    {userFolders.length >=1 ?
    (
      <section className={`sidebar ${appName} ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Folders
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addFolder}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          {userFolders.sort((a,b) => b.timestamp - a.timestamp)
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
            My Folders
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addFolder}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
         
        <p>Add your first folder</p>
        </section>
      </section>
    )  
  }
      
    </>
  )
}

export default SidebarFolders
