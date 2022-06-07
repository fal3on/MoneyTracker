
export default function ExpenseCategories({getCategory, preValue, editMode, handleCategoryUpdate}) {

  // const expenseCategories = [
  //   { id: 1, name: 'Food & Drinks (Uber, eating out, etc.' },
  //   { id: 2, name: 'Entertainment/Games'},
  //   { id: 3, name: 'Transportation & Travel'},
  //   { id: 4, name: 'Home (Utilities & Services)'},
  //   { id: 5, name: 'Health & Fitness'},
  //   { id: 6, name: 'Debt & Loans'},
  //   { id: 7, name: 'Others'},
  //   { id: 8, name: 'Shopping (Clothes, Groceries, etc.)'},
  // ]

  const expenseCategories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Entertainment'},
    { id: 3, name: 'Transportation'},
    { id: 4, name: 'Home'},
    { id: 5, name: 'Health'},
    { id: 6, name: 'Shopping'},
    { id: 7, name: 'Others'},
  ]


  function handleChange(e) {
    //console.log(e.target.value)
    getCategory(e.target.value)
  }

  function handleEditModeChange(e) {
    //console.log(e.target.value)
    handleCategoryUpdate(e.target.value)
  }

  if(editMode){
    return(
      <select onChange={handleEditModeChange} defaultValue={preValue} >
        {expenseCategories.map(category => (
          // if prev value is equal to the current value, disable it
          <option key={category.id} value={category.name} disabled={preValue === category.name}>{category.name}</option>
        ))}
      </select>
    )
  }



  return (
    <>
      <label htmlFor="expense_category">Category</label>
      <select id="expense_category" onChange={handleChange} defaultValue='select a category'>
        <option value='select a category' disabled>select a category</option>
        {expenseCategories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  )
}
