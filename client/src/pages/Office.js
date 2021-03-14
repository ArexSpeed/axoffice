import React from 'react'
import Head from '../components/Head'
import MainOffice from '../components/MainOffice'
import Nav from '../components/Nav'


const Office = () => {
  return (
    <>
      <Head title="AX Office"/>
      <div className="container">
      <Nav app="office" />
      <MainOffice />
      </div>
    </>
  )
}

export default Office
