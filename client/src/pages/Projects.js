import React from 'react'
import Nav from '../components/Nav'
import SidebarProjects from '../components/SidebarProjects'
import MainProjects from '../components/MainProjects'

const Projects = () => {
 
  return (
    <>
      <div className="container">
      <Nav app='projects' />
      <SidebarProjects />
      <MainProjects />
      </div>
    </>
  )
}

export default Projects
