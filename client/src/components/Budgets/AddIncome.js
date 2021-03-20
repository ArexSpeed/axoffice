import {useState} from 'react'
import db from "../../firebase";

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

const AddIncome = ({appName,theme,id, stage, setAddItemBox, setItems}) => {
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const selectedCategory = category;
    
  const addItem = () => {
    db.collection("budgets").doc(id).collection('items').add({
      name: itemName,
      price,
      stage,
      category: selectedCategory,
      date,
      timestamp: new Date()
  })
    setItemName('')
    setPrice('')
    setCategory('')
    setDate('')
    setItems([])
    setAddItemBox(false) 
  }

  return (
    <>
     <div className={`formBox__container ${theme}`}>
        <div className={`formBox__form ${theme}`}>
            <label htmlFor="title" className="formBox__label">Name</label>
             <input 
               type="text"
               className={`formBox__input ${theme}`} 
               value={itemName} 
               id="name"
               onChange={(e) => setItemName(e.target.value)}
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
                  {/* {showUsersToAdd} */}
                </div>
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

export default AddIncome
