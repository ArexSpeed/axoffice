import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const MainLists = ({theme}) => {
  const {id} = useParams();
  const [myList, setMyList] = useState([])
  const [listName, setListName] = useState([])
  const [editListName, setEditListName] = useState(false)
  const [items, setItems] = useState([])
  const [stageTodo, setStageTodo] = useState([])
  const [stageDone, setStageDone] = useState([])

    useEffect(() => {

      async function fetchList(){
        await db.collection('lists').onSnapshot(snapshot => (
          snapshot.docs
          .filter(doc => doc.id === id ?
          setMyList([{
            name: doc.data().name,
            users: doc.data().users,
            items: doc.data().items
          }]
          )
          : '')
        ))

        await db.collection('lists').doc(id).collection('items').onSnapshot(snapshot => (
          setItems(snapshot.docs.map(doc => doc.data()))
        ))
        } 
        
          fetchList();
      
      console.log(myList, 'myList')
      //const selectedList = lists.filter(list => list.id === id)
      // console.log(selectedList, 'selectedList')
      // setMyList(selectedList)
    }, [id])
    console.log(myList, 'myList after')
    console.log(items, 'items after')
    
   
    useEffect(() => {
      setStageTodo([])
      setStageDone([])
      myList.map(list => setListName(list))
      console.log(myList, 'myList in second effect')
      items.filter(item => item.stage === 'todo' && setStageTodo(item))
      items.filter(item => item.stage === 'done' && setStageDone(item))
    }, [myList])
    console.log(listName, 'listName')


    const addItem = () => {
      const idRand = Math.round(Math.random()*10000);
      const get = db.collection("lists").doc(id).collection('items').add({
          name: `Item ${idRand}`,
          stage: 'todo',
      })
    }

    const updateListName = () => {
      setEditListName(false)
      db.collection('lists').doc(id).update({name: listName.name})
    }

  return (
    <main className={`main ${theme}`}>
      {myList ?
      (
        <>
          <header className="main__header">
         {
           !editListName ?
           (
           <>
           <h1 className={`main__title lists ${theme}`}>{listName.name}</h1> 
           <button className="main__title-button button-icon lists" onClick={() => setEditListName(true)}><EditIcon /></button> 
           </>
           )
           :
           (
            <>
            <input className={`main__title lists ${theme}`} value={listName.name} onChange={(e) => setListName({...listName, name: e.target.value})} />
            <button className="main__title-button button-icon lists" onClick={updateListName}><DoneIcon /></button> 
            </>
           )
         }
        
        <button className="main__title-button button-icon lists"><PersonAddIcon /></button>
      </header>
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>To Do</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon lists"><AddIcon onClick={addItem}/></button>
            {id && stageTodo.map(item => (
      <div className={`main__section-item ${theme}`}>
        <h5 className={`main__section-item-title ${theme}`}>{item.name}</h5> <DoneIcon />
      </div>
    ))}
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Done</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
            <button className="button-icon lists"><DoneIcon /></button>
            {/* {showListDone} */}
          </div>
        </article>
        </div>

      </section>
        </>
      )
      :
      (
        <h2>Pusto tu</h2>
      )
    }
       
    </main>
  )
}

export default MainLists
