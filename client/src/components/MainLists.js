import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const MainLists = ({theme}) => {
  return (
    <main className={`main ${theme}`}>
      <header className="main__header">
        <h1 className={`main__title lists ${theme}`}>Shopping</h1> <button className="main__title-button button-icon lists"><EditIcon /></button> <button className="main__title-button button-icon lists"><PersonAddIcon /></button>
      </header>
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Items</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon lists"><AddIcon /></button>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Item 1</h5> <DoneIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Item 1</h5> <DoneIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Item 1</h5> <DoneIcon />
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Done</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon lists"><DoneIcon /></button>
            <div className={`main__section-item ${theme}`}>
            <ArrowBackIosIcon /> <h5 className={`main__section-item-title ${theme}`}>Item 1</h5> 
            </div>
            <div className={`main__section-item ${theme}`}>
            <ArrowBackIosIcon /> <h5 className={`main__section-item-title ${theme}`}>Item 1</h5> 
            </div>
            <div className={`main__section-item ${theme}`}>
            <ArrowBackIosIcon /> <h5 className={`main__section-item-title ${theme}`}>Item 1</h5> 
            </div>
            
          </div>
        </article>
        </div>

      </section>
    </main>
  )
}

export default MainLists
