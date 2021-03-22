import {useState} from 'react'
import db from "../../firebase";
import firebase from 'firebase';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

const EditItem = ({appName,theme,id,categories,editData, setItems, setEditItemBox}) => {
  const itemId = editData.itemId;
  const [name, setName] = useState(editData.name)
  const [price, setPrice] = useState(editData.price)
  const [category, setCategory] = useState(editData.category)
  const [date, setDate] = useState(editData.date)
 
  const showCategories = (  
    categories.map((category, i) => (
      <>
      <div key={i} style={{marginTop: '10px'}}>
        <input type="radio" name="category" id={category} className="formBox__addUsers-input" onClick={() => setCategory(category)} />
        <label key={i} htmlFor={category} className={`formBox__addUsers-label ${appName} ${theme}`}><span>{category}</span></label> 
        </div>
      </>
    )) 
  )

  const editItem = () => {
    db.collection("budgets").doc(id).collection('items').doc(itemId).update({
      name,
      price,
      category,
      date
  })
  db.collection("budgets").doc(id).update({
    categories: firebase.firestore.FieldValue.arrayUnion(category)
  })
    setName('')
    setPrice('')
    setCategory('')
    setDate('')
    setItems([])
    setEditItemBox(false)

  }

  const deleteItem = () => {
    db.collection("budgets").doc(id).collection('items').doc(itemId).delete()
    setName('')
    setPrice('')
    setCategory('')
    setDate('')
    setItems([])
    setEditItemBox(false)

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
             <label htmlFor="qty" className="formBox__label">price</label>
            <input 
              type="number"
              className={`formBox__input ${theme}`} 
              value={price} 
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              /> 
              
               <label htmlFor="date" className="formBox__label">Date</label>
               <input 
                 type="date" 
                 className={`formBox__input date ${theme}`} 
                 id="date" 
                 name="trip-start"
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                    />
           <label htmlFor="category" className="formBox__label">Category</label>
            <input 
              type="text"
              className={`formBox__input ${theme}`} 
              value={category} 
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              /> 
                <div className="formBox__addUsers">
                  {showCategories}
                </div>
               <div className="formBox__buttons">
                 <button className={`button-icon ${appName}`} onClick={editItem}>
                 <SaveAltIcon />
                 </button>

                 <button className={`button-icon-second ${appName}`} onClick={() => setEditItemBox(false)}>
                 <CancelIcon />
                 </button>

                 <button className={`button-icon-second ${appName}`} onClick={deleteItem}>
                 <DeleteIcon />
                 </button>
               </div>
           </div>
       </div>
   </>
  )
}

export default EditItem
