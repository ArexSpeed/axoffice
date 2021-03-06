import {useState, useEffect} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';

const SidebarBox = ({id,name,users, theme}) => {
  const [items, setItems] = useState([])
  useEffect(() => {
    if(id){
      db.collection('folders').doc(id).collection('items').onSnapshot(snapshot => (
        setItems(snapshot.docs.map(doc => doc.data()))
      ))
    }
  }, [id])
  return (
    <>
    <Link to={`/folders/${id}`} className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              {name} {users.length > 1 && <GroupIcon />}
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>{items.length} items</p>
          </Link>
    </>
  )
}

export default SidebarBox
