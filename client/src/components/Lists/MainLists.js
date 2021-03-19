import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import firebase from 'firebase';
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import ItemTodo from './ItemTodo';
import ItemDone from './ItemDone';
import Header from '../Header/Header';
import HeaderEmpty from '../Header/HeaderEmpty';


const MainLists = ({appName,theme}) => {
  const {id} = useParams();
  const history = useHistory();
  const [myList, setMyList] = useState([])
  const [listDetail, setListDetail] = useState([])
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [addItemBox, setAddItemBox] = useState(false)

    useEffect(() => {
      setItems([])
      //filter list to find selected list by id
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

        await db.collection('lists').doc(id).collection('items').orderBy("name", "asc").onSnapshot(snapshot => (
          snapshot.docs.map(doc => 
            setItems(prev => 
              [...prev,
                {id: doc.id, 
                 stage: doc.data().stage, 
                 name: doc.data().name, 
                 timestamp: doc.data().timestamp
              }])
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
          timestamp: new Date()
      })
      setNewItemName('')
      setAddItemBox(false)
    }


  return (
    <main className={`main ${theme}`}>
      {id ?
      (
        <>
        <Header appName={appName} theme={theme} collectionDetail={listDetail} setCollectionDetail={setListDetail} />

        <section className="main__section">
          <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Items</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
           <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(true)}><AddIcon /></button>
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
              <button className={`button-icon ${appName}`}><DoneIcon /></button>
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
        <>
        <HeaderEmpty appName={appName} theme={theme} title='AX Lists'/>
        
        <section className="main__section">
          <div className="main__section-container">
            <h3 className={`main__section-title ${theme}`}>Init</h3>
            <article className={`main__section-box ${theme}`}>
              <div className="main__section-items">
                <button className={`button-icon ${appName}`}><AddIcon /></button>
                <div className={`main__section-item ${theme}`}>
                  <span className={`main__section-item-title ${theme}`} >Task 1</span> 
                  <div>
                  <DoneIcon /> <EditIcon />
                  </div>
                </div>
                <div className={`main__section-item ${theme}`}>
                  <span className={`main__section-item-title ${theme}`} >Task 1</span> 
                  <div>
                  <DoneIcon /> <EditIcon />
                  </div>
                </div>
                <div className={`main__section-item ${theme}`}>
                  <span className={`main__section-item-title ${theme}`} >Task 1</span> 
                  <div>
                  <DoneIcon /> <EditIcon />
                  </div>
                </div>
                

              </div>
            </article>
          </div>

          <div className="main__section-container">
            <h3 className={`main__section-title ${theme}`}>Done</h3>
            <article className={`main__section-box ${theme}`}>
              <div className="main__section-items">
              <button className={`button-icon ${appName}`}><DoneIcon /></button>
              <div className={`main__section-item ${theme}`}>
                <h5 className={`main__section-item-title done ${theme}`}>Task 4</h5> 
                <div>
                  <ReplayIcon /> <DeleteIcon />
                </div>
              </div>
              <div className={`main__section-item ${theme}`}>
                <h5 className={`main__section-item-title done ${theme}`}>Task 5</h5> 
                <div>
                  <ReplayIcon /> <DeleteIcon />
                </div>
              </div>
              <div className={`main__section-item ${theme}`}>
                <h5 className={`main__section-item-title done ${theme}`}>Task 6</h5> 
                <div>
                  <ReplayIcon /> <DeleteIcon />
                </div>
              </div>

              </div>
            </article>
          </div>
        </section>
        </>
      )
    }
       
    </main>
  )
}

export default MainLists
