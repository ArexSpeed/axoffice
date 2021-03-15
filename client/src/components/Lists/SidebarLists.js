import {useState, useEffect, useContext} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import {lists} from '../data';

const SidebarLists = ({theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [myLists, setMyLists] = useState([])
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = db.collection('lists').onSnapshot(snapshot => (
      setMyLists(
        snapshot.docs.map(doc => ({
          id: doc.id, 
          name: doc.data().name,
          users: doc.data().users,
          items: doc.data().items,
        }))
      )
    ))

    return () => {
      unsubscribe();
    };
  }, [])


  // useEffect(() => {
  //   const userLists = lists.filter(list => list.users.find(user => user.id === uid))
  //   console.log(userLists, 'userList')
  //   setMyLists(userLists)
  // }, [])

  const showMyLists = myLists.map(list => (
    <Link to={`/lists/${list.id}`} className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              {list.name} {list.users.length > 1 && <GroupIcon />}
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>{list.items.length} items</p>
          </Link>
  ))

  const addList = () => {
    const idRand = Math.round(Math.random()*10000);
    db.collection("lists").add({
        name: 'New List',
        id: idRand,
        users: [{
          id: userInfo.uid,
          name: userInfo.displayName
        }],
        items: []
    });
  }

  return (
    <>
      <section className={`sidebar lists ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Lists
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addList}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          {showMyLists}

        </section>
      </section>
    </>
  )
}

export default SidebarLists
