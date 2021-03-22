import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import firebase from 'firebase';
import db from "../../firebase";

import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import Header from '../Header/Header';
import HeaderEmpty from '../Header/HeaderEmpty';
import AddFolder from './AddFolder';

const MainFolders = ({appName,theme}) => {
  const {id} = useParams();
  const history = useHistory();
  const [myFolder, setMyFolder] = useState([])
  const [folderDetail, setFolderDetail] = useState([])
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [addItemBox, setAddItemBox] = useState(false)

  useEffect(() => {
    setItems([])
    async function fetchList(){
      await db.collection('folders').onSnapshot(snapshot => (
        snapshot.docs
        .filter(doc => doc.id === id ?
        setMyFolder([{
          id: doc.id,
          name: doc.data().name,
          users: doc.data().users
        }]
        )
        : '')
      ))

      await db.collection('folders').doc(id).collection('items').orderBy("name", "asc").onSnapshot(snapshot => (
        snapshot.docs.map(doc => 
          setItems(prev => 
            [...prev,
              {id: doc.id, 
               stage: doc.data().stage, 
               name: doc.data().name, 
               url: doc.data().url,
               timestamp: doc.data().timestamp
            }])
      )))
      } 
      
        fetchList();

  }, [id])

  useEffect(() => {
    myFolder.map(list => setFolderDetail(list))
  }, [myFolder])


  return (
    <main className={`main ${theme}`}>
      {id ?
      (
      <>
        <Header appName={appName} theme={theme} collectionDetail={folderDetail} setCollectionDetail={setFolderDetail} />
        <div className="main__section">
          <div className="mainFolders__container">
            <button className={`button-icon ${appName}`} onClick={() => setAddItemBox(!addItemBox)}>
            <AddIcon />
            </button>
            {
              addItemBox && <AddFolder appName={appName} theme={theme} id={id} setAddItemBox={setAddItemBox} setItems={setItems}/>
            }

            <div className="mainFolders__items"></div>
            
          </div>
        </div>
      </>
      )
      :
      (
      <>
        <HeaderEmpty appName={appName} theme={theme} title='AX Folders'/>
        <section className="main__section">
          <div className="mainFolders__container">
         
            <button className={`button-icon ${appName}`}>
            <AddIcon />
            </button>

          <div className="mainFolders__items">
            <div className={`mainFolders__item ${theme}`}>
              <img src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title 2</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title 3</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Very logn title with ame</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title 5</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title 6</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img src="https://material-ui.com/favicon.ico" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title 7</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            <div className={`mainFolders__item ${theme}`}>
              <img className={`mainFolders__item-img`} src="" alt="I" />
              <p className={`mainBudget__item-title ${theme}`}>Title 8</p>
              <div>
              <LaunchIcon />
              <EditIcon />
              </div>
            </div>
            
          </div>
          </div>
        </section>
      </>  
      )}
    </main>
  )
}

export default MainFolders
