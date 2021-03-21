import {useState, useEffect} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';

const SidebarBox = ({id,name,users, theme}) => {
  const [items, setItems] = useState([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  useEffect(() => {
    if(id){
      db.collection('budgets').doc(id).collection('items').onSnapshot(snapshot => (
        setItems(snapshot.docs.map(doc => doc.data()))
      ))
    }
  }, [id])
  useEffect(() => {
    items.filter(item => item.stage === 'income' &&
    setIncome(prev => prev + Number(item.price)) )
    items.filter(item => item.stage === 'expense' &&
    setExpense(prev => Number(prev) + Number(item.price)) )
  }, [items])

  console.log(items, 'items budget sidebarbox')
  console.log(income, " " ,items.length, 'income in sidebar')
  return (
    <>
    <Link to={`/budgets/${id}`} className={`sidebar__box ${theme}`}>
            <h3 className={`sidebar__box-title ${theme}`}>
              {name} {users.length > 1 && <GroupIcon />}
            </h3>
            <p className={`sidebar__box-subtitle ${theme}`}>
              <span style={{color: '#7be495'}}>+{income}</span>  {"  "}
              <span style={{color: '#f44336'}}>-{expense}</span> 
              </p>
          </Link>
    </>
  )
}

export default SidebarBox
