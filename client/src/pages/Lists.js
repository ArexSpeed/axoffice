import {useState, useContext} from 'react'
import {GlobalContext} from '../GlobalProvider'
import Head from '../components/Head'
import MainLists from '../components/Lists/MainLists'
import Nav from '../components/Nav'
import SidebarLists from '../components/Lists/SidebarLists'


const Lists = () => {
  const [{theme}] = useContext(GlobalContext)
  return (
    <>
    <Head title='AX Office Lists' />
    <div className={`container ${theme}`}>
      <Nav appName='lists' theme={theme} />
      <SidebarLists appName='lists' theme={theme} />
      <MainLists appName='lists' theme={theme}/>
      </div>
    </>
  )
}

export default Lists
