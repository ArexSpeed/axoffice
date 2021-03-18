import {useState, useContext} from 'react'
import {GlobalContext} from '../GlobalProvider'
import Head from '../components/Head'
import Nav from '../components/Nav'
import SidebarBudgets from '../components/Budgets/SidebarBudgets'
import MainBudgets from '../components/Budgets/MainBudgets'


const Budgets = () => {
  const [{theme}] = useContext(GlobalContext)
  return (
    <>
    <Head title='AX Office Lists' />
    <div className={`container ${theme}`}>
      <Nav appName='budgets' theme={theme} />
      <SidebarBudgets appName='budgets' theme={theme} />
      <MainBudgets appName='budgets' theme={theme}/>
      </div>
    </>
  )
}

export default Budgets
