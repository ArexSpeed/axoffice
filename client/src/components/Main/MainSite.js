import {useState} from 'react'
import AppsSection from './AppsSection'
import Hero from './Hero'
import Nav from './Nav'

const MainSite = () => {
  const [theme, setTheme] = useState('dark')
  return (
    <div className={`mainSite ${theme}`}>
      <Nav theme={theme} setTheme={setTheme}/>
      <Hero theme={theme} />
      <AppsSection theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default MainSite
