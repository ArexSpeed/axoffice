import {useState,useEffect, useCallback} from 'react'
import Article from './Article';
import AOS from "aos";
import "aos/dist/aos.css";
import ReactCompareImage from 'react-compare-image';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import GroupIcon from '@material-ui/icons/Group';
import DevicesIcon from '@material-ui/icons/Devices';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import img from '../../images/exampleapp.svg';
import groupImg from '../../images/group.svg';
import devicesImg from '../../images/devices.svg';

const AppsSection = ({theme, setTheme}) => {
  const [position, setPosition] = useState(null)
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if(position >=0.5){
      setTheme('light')
    }
    else{
      setTheme('dark')
    }
  }, [position])

  return (
    <main className={`appsSection ${theme}`}>
      <h2 className="appsSection__title">Explore our apps</h2>
      <div className="appsSection__apps">
        <div className="appsSection__apps-button">
          <button className="button-icon lists"><AssignmentIcon /></button>
          <p className="appsSection__apps-button-name">Lists</p>
        </div>
        <div className="appsSection__apps-button">
          <button className="button-icon projects"><ViewListIcon /></button>
          <p className="appsSection__apps-button-name">Projects</p>
        </div>
        <div className="appsSection__apps-button">
          <button className="button-icon budgets"><AttachMoneyIcon /></button>
          <p className="appsSection__apps-button-name">Budgets</p>
        </div>
        <div className="appsSection__apps-button">
          <button className="button-icon folders"><FolderIcon /></button>
          <p className="appsSection__apps-button-name">Folders</p>
        </div>
      </div>
      <section className="appsSection__sections">
        <Article appName='lists' title='Lists' logo={<AssignmentIcon />} 
        desc={`Keep all your lists in one place. You can use this app for your todo list or shopping list. \n
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nisi ducimus, eveniet nostrum dolorem id omnis officiis earum inventore perspiciatis.
            `}
            img={img}
        />
        <Article appName='projects' title='Projects' logo={<ViewListIcon />} 
        desc={`Keep all your lists in one place. You can use this app for your todo list or shopping list. \n
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nisi ducimus, eveniet nostrum dolorem id omnis officiis earum inventore perspiciatis.
            `}
            img={img}
        />
        <Article appName='budgets' title='Budgets' logo={<AttachMoneyIcon />} 
        desc={`Keep all your lists in one place. You can use this app for your todo list or shopping list. \n
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nisi ducimus, eveniet nostrum dolorem id omnis officiis earum inventore perspiciatis.
            `}
            img={img}
        />
        <Article appName='folders' title='Folders' logo={<FolderIcon />} 
        desc={`Save your files from web, sites, blog or other bookmarks and and access it from any browser, anywhere \n
              If you use few browsers or devices and you like save useful sites, now you don't have to search and save bookmarks in every 
              browser just save url adress in AX Folders and have access everywhere. 
              Group your sites by topic and access them easily
              You can also share your bookmarks with your friends.
            `}
            img={img}
        />
        
      </section>
      <section className="appsSection__sections">
        <h2 className="appsSection__title">Stay connect all time with your friends, from any devices</h2>
        <article className="appsSection__article reverse">
          <div className="appsSection__article-left" data-aos="fade-left">
              <div className="appsSection__article-left-title">
                <div className={`appsSection__article-left-square `}></div>
                <button className={`button-icon green`}><GroupIcon /></button>
                <span className="appsSection__apps-button-name"> Collaboration</span>
              </div>
              <p className="appsSection__article-left-desc">
                Add your friends to your projetcs and keep focus on your tasks together <br />
                You don't have to send link to your projects, tasks or folders and send it by mail, <br />
                just add your friends, employees or other compans and give them quick access to your files
              </p>
          </div>
          <div className="appsSection__article-right" data-aos="fade-right">
            <img className="appsSection__article-right-img" src={groupImg} alt="" />
          </div>
      </article>
      <article className="appsSection__article">
          <div className="appsSection__article-left" data-aos="fade-right">
              <div className="appsSection__article-left-title">
                <div className={`appsSection__article-left-square `}></div>
                <button className={`button-icon blue`}><DevicesIcon /></button>
                <span className="appsSection__apps-button-name"> Responsive</span>
              </div>
              <p className="appsSection__article-left-desc">
                Use apps without downloading in one time from desktop and mobile <br />
                Work like you want, AX Office is created for all devices and browsers.
              </p>
          </div>
          <div className="appsSection__article-right" data-aos="fade-left">
            <img className="appsSection__article-right-img" src={devicesImg} alt="" />
          </div>
      </article>
      </section>
      <section className="appsSection__sections">
        <h2 className="appsSection__title">Work like you want</h2>
        <button className={`appsSection__button-color ${theme}`}><InvertColorsIcon /></button>
        <h3 className="appsSection__subtitle">Switch between light and dark theme and feel comfortable durning your work.</h3>
        <div className="appsSection__themeSwitcher">
        <ReactCompareImage
          leftImage={groupImg}
          rightImage={devicesImg}
          onSliderPositionChange={setPosition}
        />
        </div>
      </section>
    </main>
  )
}

export default AppsSection
