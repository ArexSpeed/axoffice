import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DoneIcon from '@material-ui/icons/Done';

const MainProjects = () => {
  return (
    <main className="main">
      <header className="main__header">
        <h1 className="main__title">AX Office</h1> <span className="main__title-edit"><EditIcon /></span>
      </header>
      <section className="main__section">
        <div className="main__section-container">
        <h3 className="main__section-title">Init</h3>
        <article className="main__section-box">
          <div className="main__section-items">
          <button className="main__section-item-add projects"><AddIcon /></button>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className="main__section-title">In Progress</h3>
        <article className="main__section-box">
          <div className="main__section-items">
        <button className="main__section-item-add projects"><TrendingUpIcon /></button>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className="main__section-title">Finished</h3>
        <article className="main__section-box">
          <div className="main__section-items">
        <button className="main__section-item-add projects"><DoneIcon /></button>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Task 1</h5> <span><ArrowForwardIosIcon /></span>
            </div>
          </div>
        </article>
        </div>

      </section>
    </main>
  )
}

export default MainProjects
