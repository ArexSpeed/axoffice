import React from 'react'
import DoneIcon from '@material-ui/icons/Done';
import db from "../../firebase";

const ItemTodo = ({docId,itemId, name, stage, theme, setItems}) => {
  const changeState = () => {
    console.log('done')
    console.log('dicId', docId)
    console.log('itemId', itemId)
    
    db.collection('lists').doc(docId).collection('items').doc(itemId).update({
      stage: 'done'
    })
    //clean items beacause on every update in MainList is add new items stage to old 
    setItems([])
  }
  return (
      <div className={`main__section-item ${theme}`}>
        <h5 className={`main__section-item-title ${theme}`}>{name}</h5> <DoneIcon onClick={changeState} />
      </div>
  )
}

export default ItemTodo
