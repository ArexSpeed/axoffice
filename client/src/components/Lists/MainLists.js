import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import ItemTodo from './ItemTodo';
import ItemDone from './ItemDone';
import AddUser from './AddUser';

const MainLists = ({theme}) => {
  const {id} = useParams();
  const history = useHistory();
  const [myList, setMyList] = useState([])
  const [listDetail, setListDetail] = useState([])
  const [editListName, setEditListName] = useState(false)
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [deleteBox, setDeleteBox] = useState(false)
  const [addItemBox, setAddItemBox] = useState(false)
  const [addUserBox, setAddUserBox] = useState(false)

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
    }, [id])
    console.log(myList, 'myList after')
    console.log(items, 'items after')
    
   
    useEffect(() => {
      myList.map(list => setListDetail(list))

      console.log(myList, 'myList in second effect')

    }, [myList])
    console.log(listDetail, 'listName')


    const addItem = () => {
      setItems([])
      db.collection("lists").doc(id).collection('items').add({
          name: newItemName,
          stage: 'todo',
      })
      setNewItemName('')
      setAddItemBox(false)
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
            <form onSubmit={updateListName}>
            <input className={`main__title-input lists ${theme}`} value={listDetail.name} onChange={(e) => setListDetail({...listDetail, name: e.target.value})} />
            </form>
            <button className="main__title-button button-icon lists" onClick={updateListName}><DoneIcon /></button> 
            </>
           )
         }
        
        <button className="main__title-button button-icon lists" onClick={() => setAddUserBox(!addUserBox)}><PersonAddIcon /></button>
        <button className="main__title-button button-icon lists" onClick={() => setDeleteBox(!deleteBox)}><DeleteIcon /></button>
        
      </header>
      {deleteBox && 
        <div className="main__actionBox lists">
        <p>Are you sure?</p>
        <div>
        <button className="main__title-button button-icon lists" onClick={() => deleteList(id)}>OK</button>
        <button className="main__title-button button-icon lists" onClick={() => setDeleteBox(false)}>NO</button>
        </div>
        </div>
      }
      {addUserBox && 
        <AddUser id={id} setAddUserBox={setAddUserBox}/>
      }
      <section className="main__section">
        <div className="main__section-container">
        <h3 className={`main__section-title ${theme}`}>Items</h3>
        <article className={`main__section-box ${theme}`}>
          <div className="main__section-items">
          <button className="button-icon lists" onClick={() => setAddItemBox(true)}><AddIcon /></button>
          {addItemBox && 
            <div className={`main__section-item ${theme}`}>
              <form onSubmit={addItem}>
            <input 
              className={`main__section-item-title input ${theme}`} 
              value={newItemName} 
              onChange={(e) => setNewItemName(e.target.value)}
              /> 
              </form>
            <SaveAltIcon style={{marginRight: '20px'}} onClick={addItem} />
          </div>
          }
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
