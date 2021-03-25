import {useState, useContext} from 'react'
import {GlobalContext} from '../GlobalProvider'
import Head from '../components/Head'
import Nav from '../components/Nav'
import MainSettings from '../components/Settings/MainSettings'


const Budgets = () => {
  const [{theme}] = useContext(GlobalContext)
  return (
    <>
    <Head title='AX Office Settings' />
    <div className={`container ${theme}`}>
      <Nav appName='office' theme={theme} />
      <MainSettings theme={theme}/>
      </div>
    </>
  )
}

export default Budgets
