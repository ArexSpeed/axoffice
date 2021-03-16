import {useState, useContext} from 'react'
import {GlobalContext} from '../GlobalProvider'
import Head from '../components/Head'
import Nav from '../components/Nav'
import SidebarProjects from '../components/Projects/SidebarProjects'
import MainProjects from '../components/Projects/MainProjects'

const Projects = () => {
  const [{theme}] = useContext(GlobalContext)
  return (
    <>
      <Head title="AX Office Project" />
      <div className={`container ${theme}`}>
      <Nav app='projects' theme={theme} />
      <SidebarProjects theme={theme} />
      <MainProjects theme={theme} />
      </div>
    </>
  )
}

export default Projects
