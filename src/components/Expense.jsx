import { useState, useEffect } from "react";
import ExpenseCategories from "./ExpenseCategories";
import { MdRamenDining as Food, MdGite as Home, MdLocalPlay as Games, MdLocalTaxi as Trans, MdMedicalServices as Health, MdShoppingCart as Shopping, MdCategory as Others, 
    MdInfo, MdMode, MdDelete, MdSave, MdCancel} from "react-icons/md";


export default function Expense({expense, removeExpense, saveEditExpense}) {

    const [edit , setEdit] = useState(false);

    function handleEdit() {
        setEdit(!edit)
    }

    const [updatedExpense, setUpdatedExpense] = useState({});

    function handleAmountChange(e) {
        //console.log('new amount: ', e.target.value);
        // remove the $ sign from the input or any other currency symbol or letter
        const amount = e.target.value.replace(/[^0-9.]/g, '');
        // if amount has no decimal places, add 2 decimal places (e.g. 100.00)
        const amountWithDecimal = amount.includes('.') ? amount : amount + '.00';
        // if amount has more than 2 decimal places, remove extra decimal places (e.g. 100.00)
        const amountWithTwoDecimalPlaces = amountWithDecimal.includes('.') ? amountWithDecimal.substring(0, amountWithDecimal.indexOf('.') + 3) : amountWithDecimal;
        setUpdatedExpense({ ...updatedExpense, amount: amountWithTwoDecimalPlaces });
    }

    function handleCategoryUpdate(category) {
        //console.log('new category: ', category);
        setUpdatedExpense({ ...updatedExpense, category: category });
    }

    useEffect (() => {
        setUpdatedExpense(expense);
    }, [expense])

    function handleUpdateExpense(id) {
        //console.log('updating expense: ', id);
        saveEditExpense(id, updatedExpense);
        setEdit(!edit);
    }

    if(edit){
        return(
            <>
                <div className="card edit_mode" key={expense.id}>
                    <div className="card_body">
                        <div className="basic_info">
                            <div className="expense_category">
                                <ExpenseCategories preValue={expense.category} editMode={edit} handleCategoryUpdate={handleCategoryUpdate} />
                            </div>
                            <div className="expense_amount">
                                <input type="float" defaultValue={expense.amount} onChange={handleAmountChange}  />
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={handleEdit} className="cancel"><i><MdCancel /></i></button>
                            <button onClick={() => handleUpdateExpense(expense.id)} className="save"><i><MdSave /></i></button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
        <div className={"wrap "}>
            <div className={"card "  + expense.category} key={expense.id}>
                <div className="card_body">
                    <div className="basic_info">
                        <div className={"expense_category"}>
                            {
                                expense.category === "Food" ?
                                    <span className="icon" title={expense.category}>
                                        <i><Food/></i>
                                    </span> :
                                expense.category === 'Entertainment'?
                                    <span className="icon"  title={expense.category}>
                                        <i><Games/></i>
                                    </span> :
                                expense.category === 'Transportation' ?
                                    <span className="icon"  title={expense.category}>
                                        <i><Trans /></i>
                                    </span> :
                                expense.category === 'Home' ?
                                    <span className="icon" title={expense.category}>
                                        <i><Home/></i>
                                    </span> :
                                expense.category === 'Health' ?
                                    <span className="icon" title={expense.category}>
                                        <i><Health/></i>
                                    </span> :
                                expense.category === 'Shopping' ?
                                    <span className="icon" title={expense.category}>
                                        <i><Shopping/></i>
                                    </span> :
                                expense.category === 'Others' ?
                                    <span className="icon" title={expense.category}>
                                        <i><Others/></i>
                                    </span> : ''
                            }
                        </div>
                        <div className="expense_amount">
                            <p>-${expense.amount}</p>
                        </div>
                    </div>
                    {/* <div className="info_toggle">
                        <input id="my-toggle" type="checkbox" />
                        <label htmlFor="my-toggle" className="toggle-btn" title="More info"><i><MdInfo /></i></label>
                    </div> */}
                    <div className="actions">
                        <button onClick={handleEdit} className="edit"><i><MdMode /></i></button>
                        <button onClick={() => removeExpense(expense.id)} className="delete"><i><MdDelete /></i></button>
                    </div>
                </div>
            </div>
            <div className="more_info">
                <div className="expense_category">
                    <p>Categoria:</p>
                    <p>{expense.category}</p>
                </div>
                <div className="expense_date">
                    <p>Fecha de registro: </p>
                    <p>{expense.date}</p>
                </div>
            </div>
        </div>
        </>
    )
}
