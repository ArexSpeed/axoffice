import {useState,useEffect, useCallback} from 'react'
import Article from './Article';
import AOS from "aos";
import "aos/dist/aos.css";
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import img from '../../images/exampleapp.svg';

const AppsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <main className="appsSection">
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
    </main>
  )
}

export default AppsSection
