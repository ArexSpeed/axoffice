import {useState} from 'react'
import Head from '../components/Head'
import MainLists from '../components/MainLists'
import Nav from '../components/Nav'
import SidebarLists from '../components/SidebarLists'

const Lists = () => {
  const [theme, setTheme] = useState('light')
  return (
    <>
    <Head title='AX Office Lists' />
    <div className={`container ${theme}`}>
      <Nav app='lists' theme={theme} setTheme={setTheme} />
      <SidebarLists theme={theme} />
      <MainLists theme={theme}/>
      </div>
    </>
  )
}

export default Lists
