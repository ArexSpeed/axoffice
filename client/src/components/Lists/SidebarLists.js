import React, {useState, useEffect} from 'react'
import AddIcon from '@material-ui/icons/Add';
import {lists} from '../data';

const SidebarLists = ({theme}) => {
  const [myLists, setMyLists] = useState([])
  const uid = '150';
  useEffect(() => {
    const userLists = lists.filter(list => list.users.find(user => user.id === uid))
    console.log(userLists, 'userList')
    setMyLists(userLists)
  }, [])

  const showMyLists = myLists.map(myList => (
    <article className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              {myList.name}
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>{myList.items.length} items</p>
          </article>
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
          <article className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              Shopping
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>20 items</p>
          </article>
          <article className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              Check longer task with few words
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>20 items</p>
          </article>
          <article className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              Current
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>20 items</p>
          </article>


        </section>
      </section>
    </>
  )
}

export default SidebarLists
