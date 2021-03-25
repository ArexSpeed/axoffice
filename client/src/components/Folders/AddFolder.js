import {useState} from 'react'
import db from "../../firebase";
import firebase from 'firebase';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

const AddFolder = ({appName, theme,id, setAddItemBox, setItems}) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const addItem = () => {
    if(!url){
      alert('Add url !')
    }
   
    if(url.slice(0,8) !== 'https://'){
      setUrl(`https://${url}`)
    }
    else{
      db.collection("folders").doc(id).collection('items').add({
        name,
        url,
        timestamp: new Date()
    })
  
      setName('')
      setUrl('')
      setItems([])
      setAddItemBox(false) 
    }
  }

  return (
    <>
           <div className={`formBox__container ${theme}`}>
        <div className={`formBox__form ${theme}`}>
            <label htmlFor="title" className="formBox__label">Name</label>
             <input 
               type="text"
               className={`formBox__input ${theme}`} 
               value={name} 
               id="name"
               onChange={(e) => setName(e.target.value)}
               /> 
              <label htmlFor="qty" className="formBox__label">url</label>
             <input 
               type="text"
               className={`formBox__input ${theme}`} 
               value={url} 
               id="price"
               onChange={(e) => setUrl(e.target.value)}
               /> 


                <div className="formBox__buttons">
                  <button className={`button-icon ${appName}`} onClick={addItem}>
                  <SaveAltIcon />
                  </button>

                  <button className={`button-icon-second ${appName}`} onClick={() => setAddItemBox(false)}>
                  <CancelIcon />
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddFolder
