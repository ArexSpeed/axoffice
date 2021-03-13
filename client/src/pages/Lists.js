import React from 'react'
import Nav from '../components/Nav'
import SidebarLists from '../components/SidebarLists'

const Lists = () => {
  return (
    <div className="container">
      <Nav app='lists' />
      <SidebarLists />
      <p style={{fontSize: '100px'}}>Lists</p>
      </div>
  )
}

export default Lists
