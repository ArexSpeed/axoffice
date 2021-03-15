import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {lists} from '../data'
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const MainLists = ({theme}) => {
  const {id} = useParams();
  const [myList, setMyList] = useState([])
  const [stageTodo, setStageTodo] = useState([])
  const [stageDone, setStageDone] = useState([])

  useEffect(() => {
    const selectedList = lists.filter(list => list.id === id)
    setMyList(selectedList)
  }, [id])

  useEffect(() => {
    setStageTodo([])
    setStageDone([])
    myList.filter(list => list.items.find(item => item.stage === 'items' && setStageTodo(prev => [...prev,item])))
    myList.filter(list => list.items.find(item => item.stage === 'done' && setStageDone(prev => [...prev,item])))
  }, [myList])

  const showListTitle = myList.map(list => (
      <header className="main__header">
        <h1 className={`main__title lists ${theme}`}>{list.name}</h1> <button className="main__title-button button-icon lists"><EditIcon /></button> <button className="main__title-button button-icon lists"><PersonAddIcon /></button>
      </header>
  ))

  const showListTodo = stageTodo.map(item => (
    <div className={`main__section-item ${theme}`}>
      <h5 className={`main__section-item-title ${theme}`}>{item.name}</h5> <DoneIcon />
    </div>
  ))

  const showListDone = stageDone.map(item => (
    <div className={`main__section-item ${theme}`}>
      <ArrowBackIosIcon /> <h5 className={`main__section-item-title ${theme}`}>{item.name}</h5> 
    </div>
  ))

  return (
    <main className={`main ${theme}`}>
      {showListTitle}
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>To Do</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon lists"><AddIcon /></button>
            {showListTodo}
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Done</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
            <button className="button-icon lists"><DoneIcon /></button>
            {showListDone}
          </div>
        </article>
        </div>

      </section>
    </main>
  )
}

export default MainLists
