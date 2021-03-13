import React from 'react'
import Nav from '../components/Nav'

const Projects = ({match}) => {
  const path = match.path
 
  return (
    <>
      <div className="container">
      <Nav app='projects' />
      <p style={{fontSize: '100px'}}>Project</p>
      </div>
    </>
  )
}

export default Projects
