import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import firebase from 'firebase';
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import ItemTodo from './ItemTodo';
import ItemDone from './ItemDone';
import AddUser from './AddUser';
import LeaveGroupBox from './LeaveGroupBox';


const MainLists = ({appName,theme}) => {
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
  const [groupBox, setGroupBox] = useState(false)
  const [leaveGroupBox, setLeaveGroupBox] = useState(false)
  const [mobileIconBox, setMobileIconBox] = useState(false)

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
            <h1 className={`main__title ${appName} ${theme}`}>{listDetail.name}</h1> 
            <button className={`main__title-button button-icon ${appName}`} onClick={() => setEditListName(true)}><EditIcon /></button> 
            </>
            )
            :
            (
             <>
             <form onSubmit={updateListName}>
             <input className={`main__title-input ${appName} ${theme}`} value={listDetail.name} onChange={(e) => setListDetail({...listDetail, name: e.target.value})} />
             </form>
             <button className={`main__title-button button-icon ${appName}`} onClick={updateListName}><DoneIcon /></button> 
             </>
            )
          }
      
          <button className={`main__title-button button-icon ${appName}`} onClick={() => setAddUserBox(!addUserBox)}><PersonAddIcon /></button>
          <div className="moreIcon-container">
            <button className={`main__title-button button-icon ${appName}`} onClick={() => setMobileIconBox(!mobileIconBox)}><MoreVertIcon /></button>
            {
              mobileIconBox &&
              <div className={`moreIcon-box ${theme}`}>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setGroupBox(!groupBox); setMobileIconBox(false)}}><PeopleOutlineIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setLeaveGroupBox(!leaveGroupBox); setMobileIconBox(false)}}><ExitToAppIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setDeleteBox(!deleteBox); setMobileIconBox(false)}}><DeleteIcon /></button>
              </div>
            }
         </div>
       </header>
       {deleteBox && 
         <div className={`main__actionBox ${appName}`}>
         <p style={{textAlign: 'center'}}>Do you want to remove this list?</p>
         <div>
         <button className={`main__title-button button-icon ${appName}`} onClick={() => deleteList(id)}>OK</button>
         <button className={`main__title-button button-icon ${appName}`} onClick={() => setDeleteBox(false)}>NO</button>
         </div>
         </div>
       }
       {addUserBox && 
         <AddUser id={id} appName={appName} setAddUserBox={setAddUserBox}/>
       }
       {groupBox && 
         (
           <div className={`main__actionBox ${appName}`}>
         {listDetail.users.map(user => <p>{user.name}</p>)}

         <button className={`main__title-button button-icon ${appName}`} onClick={() => setGroupBox(false)}>OK</button>
         </div>
         ) 
        }
        {
          leaveGroupBox && <LeaveGroupBox id={id} appName={appName} setLeaveGroupBox={setLeaveGroupBox} />
        }
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
        <header className="main__header">
          <h1 className={`main__title ${appName} ${theme}`}>AX Lists</h1> <button className={`main__title-button button-icon ${appName}`}><EditIcon /></button> <button className={`main__title-button button-icon ${appName}`}><PersonAddIcon /></button>
        </header>
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
