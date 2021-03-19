import React from 'react'
import EditIcon from '@material-ui/icons/Edit';


const IncomeItem = ({docId,taskId,name,price,date,category,theme, setItems, setEditItemBox,setEditData}) => {

  return (
    <div className={`main__section-item ${theme}`}>
      <span className={`main__section-item-title ${theme}`}>{name} {category}</span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="mainBudget__summary-box-mini income" style={{borderRadius: '5px'}}>
          <span className="mainBudget__summary-box-number-mini">{price}</span>
        </div>
      </div>
      <div>
        <EditIcon />
      </div>
    </div>
  );
}

export default IncomeItem
