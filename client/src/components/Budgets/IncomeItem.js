import React from 'react'
import EditIcon from '@material-ui/icons/Edit';


const IncomeItem = ({docId,itemId,name,price,date,category,stage,theme, setItems, setEditItemBox,setEditData}) => {

  const editItem = () => {
    setEditData({
      docId,
      itemId,
      name,
      price,
      date,
      category,
      stage,
    })
    setEditItemBox(true)
  }

  return (
    <div className={`mainBudget__item ${theme}`}>
      <div className="mainBudget__item-up">
        <p className={`mainBudget__item-title ${theme}`}>{name}</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className={`mainBudget__summary-box-mini ${stage}`} style={{borderRadius: '5px'}}>
            <span className="mainBudget__summary-box-number-mini">{price}</span>
          </div>
          <EditIcon onClick={editItem}/>
        </div>
      </div>
      <div className="mainBudget__item-down">
        <p className={`mainBudget__item-subtitle ${theme}`}>{category}</p>
        <p className={`mainBudget__item-subtitle ${theme}`}>{date}</p>
      </div>
    </div>
  );
}

export default IncomeItem
