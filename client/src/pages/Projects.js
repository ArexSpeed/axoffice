import React from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import SidebarProjects from '../components/SidebarProjects'
import MainProjects from '../components/MainProjects'

const Projects = () => {
 
  return (
    <>
      <Head title="AX Office Project" />
      <div className="container">
      <Nav app='projects' />
      <SidebarProjects />
      <MainProjects />
      </div>
    </>
  )
}

export default Projects
