import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const MainLists = () => {
  return (
    <main className="main">
      <header className="main__header">
        <h1 className="main__title">Shopping</h1> <span className="main__title-edit"><EditIcon /></span>
      </header>
      <section className="main__section">
        <div className="main__section-container">
        <h3 className="main__section-title">Items</h3>
        <article className="main__section-box">
          <div className="main__section-items">
          <button className="main__section-item-add lists"><AddIcon /></button>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Item 1</h5> <span><DoneIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Item 1</h5> <span><DoneIcon /></span>
            </div>
            <div className="main__section-item">
              <h5 className="main__section-item-title">Item 1</h5> <span><DoneIcon /></span>
            </div>
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className="main__section-title">Done</h3>
        <article className="main__section-box">
          <div className="main__section-items">
          <button className="main__section-item-add lists"><DoneIcon /></button>
            <div className="main__section-item">
            <span><ArrowBackIosIcon /></span> <h5 className="main__section-item-title">Item 1</h5> 
            </div>
            <div className="main__section-item">
            <span><ArrowBackIosIcon /></span> <h5 className="main__section-item-title">Item 1</h5> 
            </div>
            <div className="main__section-item">
            <span><ArrowBackIosIcon /></span> <h5 className="main__section-item-title">Item 1</h5> 
            </div>
          </div>
        </article>
        </div>

      </section>
    </main>
  )
}

export default MainLists
