import {useState, useContext} from 'react'
import {GlobalContext} from '../GlobalProvider'
import Head from '../components/Head'
import MainFolders from '../components/Folders/MainFolders'
import Nav from '../components/Nav'
import SidebarFolders from '../components/Folders/SidebarFolders'


const Folders = () => {
  const [{theme}] = useContext(GlobalContext)
  return (
    <>
    <Head title='AX Office Folders' />
    <div className={`container ${theme}`}>
      <Nav appName='folders' theme={theme} />
      <SidebarFolders appName='folders' theme={theme} />
      <MainFolders appName='folders' theme={theme}/>
      </div>
    </>
  )
}

export default Folders
