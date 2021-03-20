import {useState, useEffect} from 'react'

const Categories = ({theme, categoryName, items}) => {
  const [categoryIncome, setCategoryIncome] = useState(0)
  const [categoryExpense, setCategoryExpense] = useState(0)

  useEffect(() => {
    setCategoryIncome(0)
    setCategoryExpense(0)
    items.filter(item => (item.stage === 'income' && item.category === categoryName) && setCategoryIncome(prev => prev + Number(item.price)))
    items.filter(item => (item.stage === 'expense' && item.category === categoryName) && setCategoryExpense(prev => prev + Number(item.price)))
  }, [items])

  return (
    <div className={`main__section-item ${theme}`}>
    <span className={`main__section-item-title ${theme}`} >{categoryName}</span> 
    <div style={{display: 'flex', flexDirection:'row', marginRight: '10px'}}>
    <div className="mainBudget__summary-box-mini income">
    <span className="mainBudget__summary-box-number-mini">{categoryIncome}</span>
    </div>
    <div className="mainBudget__summary-box-mini expense">
    <span className="mainBudget__summary-box-number-mini">{categoryExpense}</span>
    </div>
    </div>
  </div>
  )
}

export default Categories
