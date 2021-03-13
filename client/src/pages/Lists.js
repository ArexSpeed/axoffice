import React from 'react'
import MainLists from '../components/MainLists'
import Nav from '../components/Nav'
import SidebarLists from '../components/SidebarLists'

const Lists = () => {
  return (
    <div className="container">
      <Nav app='lists' />
      <SidebarLists />
      <MainLists />
      </div>
  )
}

export default Lists
