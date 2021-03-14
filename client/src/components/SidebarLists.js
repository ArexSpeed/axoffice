import React from 'react'
import AddIcon from '@material-ui/icons/Add';

const SidebarLists = ({theme}) => {
  return (
    <>
      <section className={`sidebar lists ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Lists
          </h2>
          <button className={`sidebar__add ${theme}`}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
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
