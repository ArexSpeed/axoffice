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
import FolderItem from './FolderItem';
import FolderEmpty from './FolderEmpty';

const MainFolders = ({appName,theme}) => {
  const {id} = useParams();
  const history = useHistory();
  const [myFolder, setMyFolder] = useState([])
  const [folderDetail, setFolderDetail] = useState([])
  const [items, setItems] = useState([])
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

            <div className="mainFolders__items">
            {
              id && 
              items.map(item => (
                        <FolderItem
                          docId={id} 
                          itemId={item.id} 
                          name={item.name} 
                          url={item.url} 
                          theme={theme} 
                          setItems={setItems} 
                        />
                        ))
            }
            </div>
            
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
            <FolderEmpty name='Google' url="https://www.google.com/" theme={theme}/>
            
          </div>
          </div>
        </section>
      </>  
      )}
    </main>
  )
}

export default MainFolders
