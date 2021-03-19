import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
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
import AddUser from './AddUser';
import LeaveGroupBox from './LeaveGroupBox';


const MainBudgets = ({appName, theme}) => {
  const {id} = useParams()
  const history = useHistory();
  const [myBudgets, setMyBudgets] = useState([])
  const [budgetDetail, setBudgetDetail] = useState([])
  const [editBudgetName, setEditBudgetName] = useState(false)
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [deleteBox, setDeleteBox] = useState(false)
  const [addItemBox, setAddItemBox] = useState(false)
  const [editItemBox, setEditItemBox] = useState(false)
  const [editItemBoxProgress, setEditItemBoxProgress] = useState(false)
  const [editData, setEditData] = useState({})
  const [addUserBox, setAddUserBox] = useState(false)
  const [groupBox, setGroupBox] = useState(false)
  const [leaveGroupBox, setLeaveGroupBox] = useState(false)
  const [moreIconBox, setMoreIconBox] = useState(false)

  useEffect(() => {
    setItems([])
    //filter list to find selected list by id
    async function fetchList(){
      await db.collection('budgets').onSnapshot(snapshot => (
        snapshot.docs
        .filter(doc => doc.id === id ?
        setMyBudgets([{
          id: doc.id,
          name: doc.data().name,
          users: doc.data().users
        }]
        )
        : '')
      ))

      await db.collection('budgets').doc(id).collection('items').orderBy("name", "asc").onSnapshot(snapshot => (
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
  }, [id])

  useEffect(() => {
    myBudgets.map(project => setBudgetDetail(project))
  }, [myBudgets])


  const updateBudgetName = () => {
    setEditBudgetName(false)
    db.collection('budgets').doc(id).update({name: budgetDetail.name})
  }

  const deleteList = (id) => {
    db.collection('budgets').doc(id).delete()
    setDeleteBox(false)
    history.push('/budgets')
  }

  return (
    <main className={`main ${theme}`}>
    {id ?
      (
        <>
        <header className="main__header">
        {
         !editBudgetName ?
         (
         <>
         <h1 className={`main__title ${appName} ${theme}`}>{budgetDetail.name}</h1> 
         <button className={`main__title-button button-icon ${appName}`} onClick={() => setEditBudgetName(true)}><EditIcon /></button> 
         </>
         )
         :
         (
          <>
          <form onSubmit={updateBudgetName}>
          <input className={`main__title-input ${appName} ${theme}`} value={budgetDetail.name} onChange={(e) => setBudgetDetail({...budgetDetail, name: e.target.value})} />
          </form>
          <button className={`main__title-button button-icon ${appName}`} onClick={updateBudgetName}><DoneIcon /></button> 
          </>
         )
       }
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setAddUserBox(!addUserBox)}><PersonAddIcon /></button>
          <div className="moreIcon-container">
            <button className={`main__title-button button-icon ${appName}`} onClick={() => setMoreIconBox(!moreIconBox)}><MoreVertIcon /></button>
            {
              moreIconBox &&
              <div className={`moreIcon-box ${theme}`}>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setGroupBox(!groupBox); setMoreIconBox(false)}}><PeopleOutlineIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setLeaveGroupBox(!leaveGroupBox); setMoreIconBox(false)}}><ExitToAppIcon /></button>
                <button className={`main__title-button button-icon ${appName}`} onClick={() => {setDeleteBox(!deleteBox); setMoreIconBox(false)}}><DeleteIcon /></button>
              </div>
            }
        </div>
      </header>
      {deleteBox && 
        <div className={`main__actionBox ${appName}`}>
        <p style={{textAlign: 'center'}}>Do you want to remove this project?</p>
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
            <p style={{fontStyle: 'italic'}}>Users in budget</p>
        {budgetDetail.users.map(user => <p>{user.name}</p>)}
      
        <button className={`main__title-button button-icon ${appName}`} onClick={() => setGroupBox(false)}>OK</button>
        </div>
        ) 
      }
      {
        leaveGroupBox && <LeaveGroupBox id={id} appName={appName} setLeaveGroupBox={setLeaveGroupBox} />
      }
       </>
      )
      :
      (
        <>
        <header className="main__header">
          <h1 className={`main__title ${appName} ${theme}`}>AX Budgets</h1> <button className={`main__title-button button-icon ${appName}`}><EditIcon /></button> <button className={`main__title-button button-icon ${appName}`}><PersonAddIcon /></button>
        </header>
        <section className="main__section">
          <div className="main__section-container">
            <h3 className={`main__section-title ${theme}`}>Summary</h3>
            <article className={`main__section-box ${theme}`}>
              <div className="main__section-items">
                <div className="mainBudget__summary-header">
                <div className="mainBudget__summary-box income">
                  <p className="mainBudget__summary-box-number income">200</p>
                  <p className="mainBudget__summary-box-title income">Income</p>
                </div>
                <div className="mainBudget__summary-box expense">
                  <p className="mainBudget__summary-box-number income">200</p>
                  <p className="mainBudget__summary-box-title income">Expense</p>
                </div>
              </div>

              <div className={`mainBudget__summary-center income ${theme}`}>
                +1300
              </div>

              <div className="main__section-items">
                <p className={`mainBudget__summary-categories ${theme}`}>Categories <button className={`button-icon button-small ${appName}`}><AddIcon /></button></p> 
                <div className={`main__section-item ${theme}`}>
                  <span className={`main__section-item-title ${theme}`} >Category 1</span> 
                  <div style={{display: 'flex', flexDirection:'row'}}>
                  <div className="mainBudget__summary-box-mini income">
                  <span className="mainBudget__summary-box-number-mini">200</span>
                  </div>
                  <div className="mainBudget__summary-box-mini expense">
                  <span className="mainBudget__summary-box-number-mini">200</span>
                  </div>
                  </div>
                  <div>
                  <EditIcon />
                  </div>
                </div>
                <div className={`main__section-item ${theme}`}>
                  <span className={`main__section-item-title ${theme}`} >Category with long name for item</span> 
                  <div className="mainBudget__summary-box-mini income">
                  <span className="mainBudget__summary-box-number-mini">200</span>
                  </div>
                  <div className="mainBudget__summary-box-mini expense">
                  <span className="mainBudget__summary-box-number-mini">200</span>
                  </div>
                  <div>
                   <EditIcon />
                  </div>
                </div>
              </div>

              {/* <div className="mainBudget__summary-buttons">
                <button className="mainBudget__summary-button income">
                  <div className="button-icon"><AddIcon /></div> 
                  <span>Add income</span>
                </button>
                <button className="mainBudget__summary-button expense">
                <div className="button-icon"><AddIcon /></div> 
                  <span>Add expense</span>
                </button>
              </div> */}

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

export default MainBudgets
