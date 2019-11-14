import uuid from 'uuid';
import database from '../firebase/firebase'

// ADD_EXPENSE
// the expense is now received from the expense in startAddExpense
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


export const startAddExpense = (expenseData = {}) => {
    // the return function only works due to the middleware installed
    // the function is called internally by redux and gets called with dispatch
    // the code inside the return will save data to firebase & afterwards 
    // fire dispatch to to start addExpense so the data is reflected what is in firebase
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

        // Save data entered with push()
        // 'then' returns a ref, so we can get the id from it. 
        // then spread the rest of the properties that comes back
        // the return helps to chain another then promise to it in the test file
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSES
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSES
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});