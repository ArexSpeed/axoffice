import React from 'react'
import AddIcon from '@material-ui/icons/Add';

const SidebarLists = () => {
  return (
    <>
      <section className="sidebar lists">
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Lists
          </h2>
          <button className="sidebar__add"><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          <article className="sidebar__box">
            <h3 className="sidebar__box-title">
              Shopping
            </h3>
            <p className="sidebar__box-subtitle">20 items</p>
          </article>
          <article className="sidebar__box">
            <h3 className="sidebar__box-title">
              Check longer task with few words
            </h3>
            <p className="sidebar__box-subtitle">20 items</p>
          </article>
          <article className="sidebar__box">
            <h3 className="sidebar__box-title">
              Current
            </h3>
            <p className="sidebar__box-subtitle">20 items</p>
          </article>


        </section>
      </section>
    </>
  )
}

export default SidebarLists
