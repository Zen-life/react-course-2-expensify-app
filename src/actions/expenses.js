import uuid from 'uuid';
import database from '../firebase/firebase'

// ADD_EXPENSE
// the expense is now received from the expense in startAddExpense
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// the return function only works due to the middleware installed
// the function is called internally by redux and gets called with dispatch
// the code inside the return will save data to firebase & afterwards 
// firebase dispatch to start addExpense so the data is reflected what is in firebase
export const startAddExpense = (expenseData = {}) => {
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

// start REMOVE_EXPENSES
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {            
            dispatch(removeExpense({ id }));                 
        });
    };
};

// EDIT_EXPENSES
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// start edit expense - enables the edits to be stored in firebase
export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {                       
            dispatch(editExpense(id, updates));
        });
    };
};

// setExpenses
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses  
});

// the return function only works due to the middleware installed
// the function is called internally by redux and gets called with dispatch
// the code inside the return will save data to firebase & afterwards 
// firebase dispatch to start setExpenses so the data is reflected what is in firebase
export const startSetExpenses = () => {
    return (dispatch) => { 
        // 'then' returns a snapshot, so we can get the id from it. 
        // then spread the rest of the properties that comes back
        // the return helps to chain another then promise to it in the test file       
        return database.ref('expenses').once('value').then((snapshot) => {
        const expenses = []; // array to accept data from the object list
        
        // childSnapshot can be called anything. snapshot is called once for each child (expense)
        snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
        });

        dispatch(setExpenses(expenses));        
        });
    };    
};