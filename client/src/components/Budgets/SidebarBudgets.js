import {useState, useEffect, useContext} from 'react'
import { GlobalContext } from "../../GlobalProvider";
import firebase from 'firebase'
import db from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import SidebarBox from './SidebarBox';

const SidebarBudgets = ({appName,theme}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [budgets, setBudgets] = useState([])
  const [userBudgets, setUserBudgets] = useState([])
  
  useEffect(() => {

   const unsubscribe = db.collection('budgets').onSnapshot(snapshot => (
      setBudgets(
        snapshot.docs.map(doc => ({
          id: doc.id, 
          name: doc.data().name,
          users: doc.data().users,
          timestamp: doc.data().timestamp,
        }))
      )
    ))
    return () => {
      unsubscribe();
    };
  }, [])

  useEffect(() => {
    setUserBudgets([])
    budgets.filter(budget => 
      budget.users.find(name => name.name === userInfo.displayName) ? setUserBudgets(prev => [...prev,budget]) : ''
    )
   }, [budgets])

   const addBudget = () => {
    db.collection("budgets").add({
        name: 'New Budget',
        users: [{
          id: userInfo.uid,
          name: userInfo.displayName
        }],
        categories: [],
        timestamp: new Date(),
        timestampf: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

   return (
    <>
    {userBudgets.length >=1 ?
    (
      <section className={`sidebar ${appName} ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Budgets
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addBudget}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
          {userBudgets.sort((a,b) => b.timestamp - a.timestamp)
          .map(list => (
            <SidebarBox key={list.id} id={list.id} name={list.name} users={list.users} theme={theme} />
            ))}
        </section>
      </section>
    )
    :
    (
      <section className={`sidebar ${appName} ${theme}`}>
        <header className="sidebar__header">
          <h2 className="sidebar__title">
            My Budgets
          </h2>
          <button className={`sidebar__add ${theme}`} onClick={addBudget}><AddIcon /></button>
        </header>
        
        <section className="sidebar__boxes">
         
        <p>Add your first budget</p>
        </section>
      </section>
    )  
  }
      
    </>
  )
}

export default SidebarBudgets
