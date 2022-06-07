import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";

function App() {

  const [expenses, setExpenses] = useState([]);

  /* local storage implementation */

  const LOCAL_STORAGE_KEY = 'expenses';

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (expenses) {
      setExpenses(expenses);
    }
  }, []);

  useEffect(() => {
    if(expenses?.length) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

/* end local storage implementation */

  // add expense to expenses array
  function addExpense(expense) {
    expense.id = uuidv4();
    setExpenses([...expenses, expense]);
  }

  // remove expense from expenses array
  function removeExpense(id) {
    //console.log(id);
    setExpenses(expenses.filter(expense => expense.id !== id));

    // remove expense from local storage
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  // edit expense from expenses array
  function saveEditExpense(id, upatedExpense) {
    //console.log('Updated data: ', id, upatedExpense)
    setExpenses(expenses.map(expenseItm => (expenseItm.id === id ? upatedExpense : expenseItm)))
  }

  // wipe expenses array
  function wipeExpenses() {
    setExpenses([]);

    // wipe expenses from local storage
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  // show total spent
  function getTotalSpent() {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  }
  // add commas to numbers
  function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // show the name of the most common expense category (e.g. Food) if expenses array is not empty
  function getMostCommonCategory() {
    if (expenses.length > 0) {
      const categoryCount = {};
      expenses.forEach(expense => {
        if (!categoryCount[expense.category]) {
          categoryCount[expense.category] = 1;
        } else {
          categoryCount[expense.category]++;
        }
      });
      const mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b);
      return mostCommonCategory;
    }
  }
  //console.log(getMostCommonCategory());

  // show the date of the first expense added to the expenses array
  function getFirstExpenseDate() {
    if (expenses.length > 0) {
      const firstExpenseDate = expenses[0].date;
      return firstExpenseDate;
    }
    return 'No date yet'
  }

  return (
    <div className="App">
      <header>
        <div className="head-wrap">
        <div className="total_spent">
          <h2>${addCommas(getTotalSpent())}</h2>
          <span>Total spent</span>
        </div>
        <div className="common_category">
          <h2>{getMostCommonCategory() ? getMostCommonCategory() : 'Your most'}</h2>
          <span>Common expense</span>
        </div>
        <div className="start_date">
          <h2>{getFirstExpenseDate()}</h2>
          <span>Tracked since</span>
        </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <AddExpense addExpense={addExpense} />
        </div>
        <div className="row">
          <ExpenseList expenses={expenses} removeExpense={removeExpense} saveEditExpense={saveEditExpense} />
        </div>
      </div>
        {expenses.length > 5 ? (
          <footer>
            <p>{`Click the button if you wish to perform a quick reset, This count has been going since `}<span>{getFirstExpenseDate()}</span></p>
            <br />
              <button className="wipe_btn" onClick={wipeExpenses}>
                Wipe All expenses
              </button>
          </footer>
            ) : null}
    </div>
  );
}

export default App;
