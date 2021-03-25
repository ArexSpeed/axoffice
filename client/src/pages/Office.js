import {useContext} from 'react'
import {GlobalContext} from '../GlobalProvider'
import Head from '../components/Head'
import MainOffice from '../components/Office/MainOffice'
import Nav from '../components/Nav'


const Office = () => {
  const [{theme}] = useContext(GlobalContext)
  return (
    <>
      <Head title="AX Office"/>
      <div className={`container ${theme}`}>
      <Nav appName="office" theme={theme} />
      <MainOffice theme={theme} />
      </div>
    </>
  )
}

export default Office
