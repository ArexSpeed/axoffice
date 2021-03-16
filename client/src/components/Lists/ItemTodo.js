import {useState} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DoneIcon from '@material-ui/icons/Done';
import db from "../../firebase";

const ItemTodo = ({docId,itemId, name, stage, theme, setItems}) => {
  const [itemName, setItemName] = useState(name)
  const [editState, setEditState] = useState(false)
  const changeState = () => {
    db.collection('lists').doc(docId).collection('items').doc(itemId).update({
      stage: 'done'
    })
    //clean items beacause on every update in MainList is add new items stage to old 
    setItems([])
  }

  const updateName = () => {
    db.collection('lists').doc(docId).collection('items').doc(itemId).update({
      name: itemName
    })
    setItems([])
  }
  return (
      <div className={`main__section-item ${theme}`}>
        {!editState ? 
        (
          <>
          <span className={`main__section-item-title ${theme}`} > {name}</span> 
          <div>
          <DoneIcon onClick={changeState} />
          <EditIcon onClick={() => setEditState(true)} />
          </div>
          </>
        ) :
        (
          <>
          <form onSubmit={updateName}>
            <input 
              className={`main__section-item-title input ${theme}`}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            </form>
            <div>
            <SaveAltIcon onClick={updateName} />
            </div>
          </>
        )}
      </div>
  )
}

export default ItemTodo
