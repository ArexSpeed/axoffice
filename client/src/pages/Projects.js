import React from 'react'
import Nav from '../components/Nav'
import SidebarProjects from '../components/SidebarProjects'

const Projects = ({match}) => {
  const path = match.path
 
  return (
    <>
      <div className="container">
      <Nav app='projects' />
      <SidebarProjects />
      <p style={{fontSize: '100px'}}>Project</p>
      </div>
    </>
  )
}

export default Projects
