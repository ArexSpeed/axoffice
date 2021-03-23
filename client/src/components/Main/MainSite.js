import React from 'react'
import AppsSection from './AppsSection'
import Hero from './Hero'
import Nav from './Nav'

const MainSite = () => {
  return (
    <div className="mainSite">
      <Nav />
      <Hero />
      <AppsSection />
    </div>
  )
}

export default MainSite
