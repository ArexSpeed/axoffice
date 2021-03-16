import {useState, useEffect, useContext} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import SidebarBox from './SidebarBox';

const SidebarLists = ({theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [myLists, setMyLists] = useState([])
  const history = useHistory();
  
  useEffect(() => {
    // db.collection('lists').where("users", "array-contains", "name")
    // .where("name", "==", userInfo.displayName)
    // .get()
    // .then(snapshot => (
    //   setMyLists(
    //     snapshot.docs.map(doc => ({
    //       id: doc.id, 
    //       name: doc.data().name,
    //       users: doc.data().users,
    //     }))
    //   )
    // ))
    // .onSnapshot(snapshot => (
    //   setMyLists(
    //     snapshot.docs.map(doc => ({
    //       id: doc.id, 
    //       name: doc.data().name,
    //       users: doc.data().users,
    //     }))
    //   )
    // ))

    db.collection('lists').onSnapshot(snapshot => (
      setMyLists(
        snapshot.docs.map(doc => ({
          id: doc.id, 
          name: doc.data().name,
          users: doc.data().users,
        }))
      )
    ))

  }, [])


  // useEffect(() => {
  //   const userLists = lists.filter(list => list.users.find(user => user.id === uid))
  //   console.log(userLists, 'userList')
  //   setMyLists(userLists)
  // }, [])


  const addList = () => {
    const idRand = Math.round(Math.random()*10000);
    db.collection("lists").add({
        name: 'New List',
        id: idRand,
        users: [{
          id: userInfo.uid,
          name: userInfo.displayName
        }],
        timestamp: Date.now()
    });
  }

  return (
    <>
    {myLists.length >=1 ?
    (
      <section className={`sidebar lists ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Lists
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addList}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          {myLists.map(list => (
            <SidebarBox id={list.id} name={list.name} users={list.users} theme={theme} />
            ))}
        </section>
      </section>
    )
    :
    (
      <section className={`sidebar lists ${theme}`}>
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
