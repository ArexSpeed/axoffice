import React, { useState } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import SidebarProjects from '../components/SidebarProjects'
import MainProjects from '../components/MainProjects'

const Projects = () => {
 const [theme, setTheme] = useState('light')
  return (
    <>
      <Head title="AX Office Project" />
      <div className={`container ${theme}`}>
      <Nav app='projects' theme={theme} setTheme={setTheme} />
      <SidebarProjects theme={theme} />
      <MainProjects theme={theme} />
      </div>
    </>
  )
}

export default Projects
