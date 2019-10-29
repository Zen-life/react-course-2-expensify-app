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
    // firebase dispatch start addExpense so the data is reflected what is in firebase
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

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

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// export const startSetExpenses - async function
export const startSetExpenses = () => {

    // the return function only works due to the middleware installed
    // the function is called internally by redux and gets called with dispatch
    // the code inside the return will save data to firebase & afterwards 
    // firebase dispatch setExpenses so the data is reflected what is in firebase
    return (dispatch) => {
        // 'then' returns a snapshot, so we can get the id from it. 
        // then spread the rest of the properties that comes back
        // the return helps to chain another then promise to it in the test file
        return database.ref('expenses')
            .once('value')
            .then((snapshot) => {
            const expenses = []; // array to accept data from the object list

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            return dispatch(setExpenses(expenses));
        });
    };

};
    
//reading data from the expenses db *once
// every data has a reference either to the object content, id or auto gen key/id
// using 'key' with  childSnapshot allows access to that data ref
// depending where the childSnapshot is getting called from frbse
// e.g. the above childSnapshot ref's the autogen key by f. 
// then we 'spread' what comes back with childSnapshot.val()
// NB the variable 'childSnapshot' can be called anything