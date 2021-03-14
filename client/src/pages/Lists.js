import React from 'react'
import Head from '../components/Head'
import MainLists from '../components/MainLists'
import Nav from '../components/Nav'
import SidebarLists from '../components/SidebarLists'

const Lists = () => {
  return (
    <>
    <Head title='AX Office Lists' />
    <div className="container">
      <Nav app='lists' />
      <SidebarLists />
      <MainLists />
      </div>
    </>
  )
}

export default Lists
