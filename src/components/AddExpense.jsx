import { useState } from "react";
import ExpenseCategories from "./ExpenseCategories";

export default function AddExpense({addExpense}) {

    const date = new Date();
    const today = date.toISOString().split('T')[0];
    const dateFormat = today.split('-').reverse().join('-');

    const [expense, setExpense] = useState({
        amount: '',
        category: '',
        date: dateFormat
    });

    function handleAmountChange(e) {
        // remove the $ sign from the input or any other currency symbol or letter
        const amount = e.target.value.replace(/[^0-9.]/g, '');
        // if amount has no decimal places, add 2 decimal places (e.g. 100.00)
        const amountWithDecimal = amount.includes('.') ? amount : amount + '.00';
        // if amount has more than 2 decimal places, remove extra decimal places (e.g. 100.00)
        const amountWithTwoDecimalPlaces = amountWithDecimal.includes('.') ? amountWithDecimal.substring(0, amountWithDecimal.indexOf('.') + 3) : amountWithDecimal;

        setExpense({ ...expense, amount: amountWithTwoDecimalPlaces });
    }

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(expense)
        if (expense.amount === '' || expense.category === '') return
        addExpense(expense);

        // reset the expense object
        setExpense({ amount: '', category: '', date: dateFormat });
        e.currentTarget.reset();
        //console.log(expense.amount)
    }

    function getCategory(category) {
        //console.log(category);
        setExpense({ ...expense, category: category });
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="category">
                    <ExpenseCategories getCategory={getCategory} />
                </div>
                <div className="amount">
                    <label htmlFor="expense_amount">Amount</label>
                    <input type="float" id="expense_amount" placeholder="100.95" onChange={handleAmountChange} autoComplete='off'/>
                </div>
            </div>
            <button>Add Expense</button>
        </form>
    </>
  )
}
