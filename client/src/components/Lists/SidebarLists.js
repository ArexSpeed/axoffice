import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import {lists} from '../data';

const SidebarLists = ({theme}) => {
  const [myLists, setMyLists] = useState([])
  const uid = '120';
  useEffect(() => {
    const userLists = lists.filter(list => list.users.find(user => user.id === uid))
    console.log(userLists, 'userList')
    setMyLists(userLists)
  }, [])

  const showMyLists = myLists.map(myList => (
    <Link to={`/lists/${myList.id}`} className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              {myList.name}
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>{myList.items.length} items</p>
          </Link>
  ))

  const addList = () => console.log('add')

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
