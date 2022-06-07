import Expense from './Expense'

export default function ExpenseList({expenses, removeExpense, saveEditExpense}) {

  if(expenses.length > 0){
    return (
        <>
        <div className="list_box">
            {expenses.map(expense => (
                <Expense key={expense.id} expense={expense} removeExpense={removeExpense} saveEditExpense={saveEditExpense} />
            ))}
        </div>
        </>
      )
  }

    return (
        <div className="empty_list">
            <h3>No expenses found</h3>
        </div>
    )
}
