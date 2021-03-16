import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ItemTodo from './ItemTodo';
import ItemDone from './ItemDone';

const MainLists = ({theme}) => {
  const {id} = useParams();
  const history = useHistory();
  const [myList, setMyList] = useState([])
  const [listDetail, setListDetail] = useState([])
  const [editListName, setEditListName] = useState(false)
  const [deleteBox, setDeleteBox] = useState(false)
  const [items, setItems] = useState([])

    useEffect(() => {
      setItems([])
      async function fetchList(){
        await db.collection('lists').onSnapshot(snapshot => (
          snapshot.docs
          .filter(doc => doc.id === id ?
          setMyList([{
            id: doc.id,
            name: doc.data().name,
            users: doc.data().users
          }]
          )
          : '')
        ))

        await db.collection('lists').doc(id).collection('items').onSnapshot(snapshot => (
          snapshot.docs.map(doc => 
            setItems(prev => [...prev,{id: doc.id, stage: doc.data().stage, name: doc.data().name}])
        )))
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
      myList.map(list => setListDetail(list))
      // db.collection('lists').doc(id).collection('items').onSnapshot(snapshot => (
      //   snapshot.docs.map(doc => 
      //     setItems(prev => [...prev,{id: doc.id, stage: doc.data().stage, name: doc.data().name}])
      // )))
      console.log(myList, 'myList in second effect')

    }, [myList])
    console.log(listDetail, 'listName')


    const addItem = () => {
      setItems([])
      const idRand = Math.round(Math.random()*10000);
      const get = db.collection("lists").doc(id).collection('items').add({
          name: `Item ${idRand}`,
          stage: 'todo',
      })
    }

    const updateListName = () => {
      setEditListName(false)
      db.collection('lists').doc(id).update({name: listDetail.name})
    }

    const deleteList = (id) => {
      db.collection('lists').doc(id).delete()
      setDeleteBox(false)
      history.push('/lists')
    }

  return (
    <main className={`main ${theme}`}>
      {id ?
      (
        <>
          <header className="main__header">
         {
           !editListName ?
           (
           <>
           <h1 className={`main__title lists ${theme}`}>{listDetail.name}</h1> 
           <button className="main__title-button button-icon lists" onClick={() => setEditListName(true)}><EditIcon /></button> 
           </>
           )
           :
           (
            <>
            <input className={`main__title-input lists ${theme}`} value={listDetail.name} onChange={(e) => setListDetail({...listDetail, name: e.target.value})} />
            <button className="main__title-button button-icon lists" onClick={updateListName}><DoneIcon /></button> 
            </>
           )
         }
        
        <button className="main__title-button button-icon lists"><PersonAddIcon /></button>
        <button className="main__title-button button-icon lists" onClick={() => setDeleteBox(!deleteBox)}><DeleteIcon /></button>
        
      </header>
      {deleteBox && 
        <div className="main__delete lists">
        <p>Are you sure?</p>
        <div>
        <button className="main__title-button button-icon lists" onClick={() => deleteList(id)}>OK</button>
        <button className="main__title-button button-icon lists" onClick={() => setDeleteBox(false)}>NO</button>
        </div>
        </div>
      }
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Items</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon lists"><AddIcon onClick={addItem}/></button>
            {id && items.filter(item => item.stage === 'todo')
            .map(item => (
              <ItemTodo docId={id} itemId={item.id} name={item.name} stage={item.stage} theme={theme} setItems={setItems} />
            ))}
          </div>
        </article>
        </div>

        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Done</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
            <button className="button-icon lists"><DoneIcon /></button>
            {id && items.filter(item => item.stage === 'done')
            .map(item => (
              <ItemDone docId={id} itemId={item.id} name={item.name} stage={item.stage} theme={theme} setItems={setItems} />
            ))}
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
