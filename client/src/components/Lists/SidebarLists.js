import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import {lists} from '../data';

const SidebarLists = ({theme}) => {
  const [myLists, setMyLists] = useState([])
  const history = useHistory();
  const uid = '150';
  useEffect(() => {
    const userLists = lists.filter(list => list.users.find(user => user.id === uid))
    console.log(userLists, 'userList')
    setMyLists(userLists)
  }, [])

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
    setMyLists(prev => [
      ...prev,
      {
        id: idRand,
        name: 'New List',
        users: [{
          id: '150',
          name: 'Mick'
        }],
        items: []
      },
    ])
    history.push(`/lists/${idRand}`)
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
