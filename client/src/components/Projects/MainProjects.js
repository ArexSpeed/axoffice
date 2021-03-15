import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DoneIcon from '@material-ui/icons/Done';

const MainProjects = ({theme}) => {

  return (
    <main className={`main ${theme}`}>
      <header className="main__header">
        <h1 className={`main__title projects ${theme}`}>AX Office</h1> <button className="main__title-button button-icon projects"><EditIcon /></button> <button className="main__title-button button-icon projects"><PersonAddIcon /></button>
      </header>
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Init</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon projects"><AddIcon /></button>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 1</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 2</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 3</h5> <ArrowForwardIosIcon />
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>In Progress</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
        <button className="button-icon projects"><TrendingUpIcon /></button>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 1</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 2</h5> <ArrowForwardIosIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 3</h5> <ArrowForwardIosIcon />
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Finished</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
        <button className="button-icon projects"><DoneIcon /></button>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 1</h5> <DoneIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 2</h5> <DoneIcon />
            </div>
            <div className={`main__section-item ${theme}`}>
              <h5 className={`main__section-item-title ${theme}`}>Task 3</h5> <DoneIcon />
            </div>
          </div>
        </article>
        </div>

      </section>
    </main>
  )
}

export default MainProjects
