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
        } 
        
          fetchList();
      
      console.log(myList, 'myList')
      //const selectedList = lists.filter(list => list.id === id)
      // console.log(selectedList, 'selectedList')
      // setMyList(selectedList)
    }, [id])
    console.log(myList, 'myList after')
    useEffect(() => {
      setStageTodo([])
      setStageDone([])

      console.log(myList, 'myList in second effect')
      // if(id && myList){
      //   myList.find(item => item.name === 'School' && setStageTodo(prev => [...prev,item]))
      // }
      //console.log(myList.items.length, 'items')
      if(id && myList){
       myList.filter(list => list.items.find(item => item.stage === 'todo' && setStageTodo(prev => [...prev,item])))
      }
    // const showListTodo = stageTodo.map(item => (
    //   <div className={`main__section-item ${theme}`}>
    //     <h5 className={`main__section-item-title ${theme}`}>{item.name}</h5> <DoneIcon />
    //   </div>
    // ))
      //myList.items.find(item => item.stage === 'done' && setStageDone(prev => [...prev,item]))
      //myList.filter(list => list.items.find(item => item.stage === 'items' && setStageTodo(prev => [...prev,item])))
      //myList.filter(list => list.items.find(item => item.stage === 'done' && setStageDone(prev => [...prev,item])))
    }, [myList])
//console.log(items.items.length, 'items')

    // if(id){

    //   myList.items.find(item => item.stage === 'todo' && setStageTodo(prev => [...prev,item]))
    // }
  
    // const showListTitle = myList.map(list => (
    //     <header className="main__header">
    //       <h1 className={`main__title lists ${theme}`}>{list.name}</h1> <button className="main__title-button button-icon lists"><EditIcon /></button> <button className="main__title-button button-icon lists"><PersonAddIcon /></button>
    //     </header>
    // ))
  
  
    // const showListDone = stageDone.map(item => (
    //   <div className={`main__section-item ${theme}`}>
    //     <ArrowBackIosIcon /> <h5 className={`main__section-item-title ${theme}`}>{item.name}</h5> 
    //   </div>
    // ))

    const addItem = () => {
      const idRand = Math.round(Math.random()*10000);
      const get = db.collection("lists").doc(id).onSnapshot(snapshot =>
        console.log(snapshot, 'snapshot')
        // snapshot.docs.map(doc => doc.items.add({
        //   id: idRand,
        //   name: `Item ${idRand}`,
        //   stage: 'todo',
        // }))
        )
      console.log(get, 'get items in add')
    //   db.collection("lists").doc(id).add({
    //       items: [...items,
    //         {
    //         id: idRand,
    //         name: `Item ${idRand}`,
    //         stage: 'todo',
    //       }]
    // });
    }

  return (
    <main className={`main ${theme}`}>
       <header className="main__header">
        <h1 className={`main__title lists ${theme}`}>{myList.map(list => list.name)}</h1> <button className="main__title-button button-icon lists"><EditIcon /></button> <button className="main__title-button button-icon lists"><PersonAddIcon /></button>
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
    </main>
  )
}

export default MainLists
