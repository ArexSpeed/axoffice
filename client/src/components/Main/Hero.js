import {useState,useEffect, useCallback} from 'react'
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import officebudgets from '../../images/officebudgets.svg'
import officelists from '../../images/officelists.svg'
import officeprojects from '../../images/officeprojects.svg'
import officefolders from '../../images/officefolders.svg'

const Hero = () => {
  const [name, setName] = useState('lists')
  const [icon, setIcon] = useState(<AssignmentIcon />)
  const [image, setImage] = useState(officelists)
  const apps = [
    {
      name: 'lists',
      icon: <AssignmentIcon />,
      img: officelists
    },
    {
      name: 'projects',
      icon: <ViewListIcon />,
      img: officeprojects
    }, 
    {
      name: 'budgets',
      icon: <AttachMoneyIcon />,
      img: officebudgets
    },
    {
      name: 'folders',
      icon: <FolderIcon />,
      img: officefolders
    },
  ]
  const appNames = ['lists', 'projects', 'budgets', 'folders']
  
  const nameChange = useCallback(() => {

    const randName= Math.floor(Math.random() * appNames.length);
    setName(apps[randName].name);
    setIcon(apps[randName].icon);
    setImage(apps[randName].img);
  }, [setName]);

  useEffect(() => {

    const intervalId = setInterval(() => {
      nameChange()
    }, 2000);
    return () => clearInterval(intervalId);
  }, [nameChange]);


  return (
    <div className="mainSite__hero">
      <section className={`mainSite__hero-left ${name}`}>
        <div className={`mainSite__hero-left-div ${name}`}></div>
        <p className="mainSite__hero-left-title">AX Office</p>
        <p className="mainSite__hero-left-desc">
          One app a lot of <span className={`mainSite__hero-left-desc ${name}`}> tools  </span><button className={`button-icon ${name}`}>{icon}</button>  <br />
          Create and work like you want <br />
          Best option for organize all your  
          <span className={`mainSite__hero-left-desc ${name}`}> {name}</span>
        </p>
        <button className={`mainSite__hero-left-button ${name}`}>
          EXPLORE 
          <div className={`mainSite__hero-left-button-arrow`}>&darr;</div>
        </button>

      </section>
      <section className="mainSite__hero-right">
        <img src={image} alt="" className="mainSite__hero-right-img" />
        <div className={`mainSite__hero-right-square ${name}`}></div>
      </section>
    </div>
  )
}

export default Hero
