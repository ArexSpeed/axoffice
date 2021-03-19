import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import db from "../../firebase";
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import Header from '../Header/Header';
import HeaderEmpty from '../Header/HeaderEmpty';
import AddIncome from './AddIncome';
import IncomeItem from './IncomeItem';


const MainBudgets = ({appName, theme}) => {
  const {id} = useParams()
  const history = useHistory();
  const [myBudgets, setMyBudgets] = useState([])
  const [budgetDetail, setBudgetDetail] = useState([])
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [addItemBox, setAddItemBox] = useState(false)
  const [editItemBox, setEditItemBox] = useState(false)
  const [editItemBoxProgress, setEditItemBoxProgress] = useState(false)
  const [editData, setEditData] = useState({})


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
               price: doc.data().price,
               category: doc.data().category,
               date: doc.data().date,
               timestamp: doc.data().timestamp
            }])
      )))
      } 
        fetchList();
  }, [id])

  useEffect(() => {
    myBudgets.map(project => setBudgetDetail(project))
  }, [myBudgets])


  return (
    <main className={`main ${theme}`}>
    {id ?
      (
        <>
        <Header appName={appName} theme={theme} collectionDetail={budgetDetail} setCollectionDetail={setBudgetDetail} />

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

                <div className="mainBudget__summary-categories">
                <p className={`mainBudget__summary-categories-title ${theme}`}>Categories <button className={`button-icon button-small ${appName}`}><AddIcon /></button></p> 
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
                </div>

              </div>
            </article>
          </div>

          <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Income</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
              <button className={`button-icon green`} onClick={() => setAddItemBox(!addItemBox)}><TrendingUpIcon /></button>
            {addItemBox && 
              <AddIncome appName={appName} theme={theme} id={id} stage="income" setItems={setItems} setAddItemBox={setAddItemBox}/>
            }
            {/* {editItemBox && 
              <EditTask appName={appName} theme={theme} id={id} users={projectDetail.users} editData={editData} setItems={setItems} setEditItemBox={setEditItemBox}/>
            } */}
            {
              id && 
              items.filter(item => item.stage === 'income')
                   .map(item => (
                        <IncomeItem 
                          docId={id} 
                          taskId={item.id} 
                          name={item.name} 
                          price={item.price} 
                          date={item.date} 
                          category={item.category} 
                          theme={theme} 
                          setItems={setItems} 
                          setEditItemBox={setEditItemBox} 
                          setEditData={setEditData} 
                        />
                        ))
            }
            </div>
          </article>
        </div>

        <div className="main__section-container">
          <h3 className={`main__section-title ${theme}`}>Expense</h3>
          <article className={`main__section-box ${theme}`}>
            <div className="main__section-items">
              <button className={`button-icon red`} onClick={() => setAddItemBox(!addItemBox)}><TrendingDownIcon /></button>
            {/* {addItemBox && 
              <AddTask appName={appName} theme={theme} id={id} users={projectDetail.users} setItems={setItems} setAddItemBox={setAddItemBox}/>
            }
            {editItemBox && 
              <EditTask appName={appName} theme={theme} id={id} users={projectDetail.users} editData={editData} setItems={setItems} setEditItemBox={setEditItemBox}/>
            }
            {
              id && items.filter(item => item.stage === 'init')
                        .map(item => (
                          <TaskInit docId={id} taskId={item.id} title={item.title} desc={item.desc} date={item.date} users={item.users} stage={item.stage} theme={theme} setItems={setItems} setEditItemBox={setEditItemBox} setEditData={setEditData} />
                        ))
            } */}
            </div>
          </article>
        </div>

        </section>
        </>
      )
      :
      (
        <>
        <HeaderEmpty appName={appName} theme={theme} title='AX Budgets'/>
        
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
