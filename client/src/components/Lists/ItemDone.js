import React from 'react'
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';

import db from "../../firebase";

const ItemDone = ({docId,itemId, name, stage, theme, setItems}) => {
  const changeState = () => { 
    db.collection('lists').doc(docId).collection('items').doc(itemId).update({
      stage: 'todo'
    })
    setItems([])
  }
  const deleteItem = () => {
    db.collection('lists').doc(docId).collection('items').doc(itemId).delete()
    setItems([])
  }
  return (
      <div className={`main__section-item ${theme}`}>
        <h5 className={`main__section-item-title done ${theme}`}>{name}</h5> 
        <div>
        <ReplayIcon onClick={changeState} /> <DeleteIcon onClick={deleteItem} />
        </div>
      </div>
  )
}

export default ItemDone
