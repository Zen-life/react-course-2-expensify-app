import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

//creating mock uid for testing
const uid = 'sometestuid';
const defaultAuthState = { auth: { uid } }; // object containing object of the uid

// enable mock store const to be called by any test that needs it
// then parse in the middleware we want to use 'thunk'
const createMockStore = configureMockStore([thunk]);

// beforeEach lifecyle call to firebase to fetch data stored
// expenses.forEach loops over each expenses array and add it to expensesData
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}; // setting value from the id on the expensesData
    });
    database.ref(`user/${uid}/expenses`).set(expensesData).then(() => done()); 
    // 'done' ensures beforeEach does not let test cases to run until 
    // firebase has sync the data and call done()
});

// the functions are in file imported above. So just call it in test
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState); // ensuring store has uid for state
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({ 
            type: 'REMOVE_EXPENSE',
            id 
        });
        return database.ref(`user/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        // snapsshot returns null when it try's to fetch data that does not exist
        expect(snapshot.val()).toBeFalsy(); // or toBe(null)
        done(); // done() moved here from below as then() in this code is async also
    });
});


//test case for editExpense
test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState); // ensuring store has uid for state
    const id = expenses[1].id;    
    const updates = { amount: 3000 }; // only editing the amount
   
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();  // get actions array back. only 1 item updated     
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        
        return database.ref(`user/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {        
        expect(snapshot.val().amount).toBe(updates.amount);
        done();        
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('Should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState); // ensuring store has uid for state
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };
    // only passed in 1 item above (expenseData), so 1st item 'action[0]'
    // NB. we need to wait for firbase to save and sync before we can expect, hence then()
    // 'expect.any(String)' uses expect to check for any string, this time id
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions(); // returns array of data dispatched to store to action
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }           
        });
        
        // quering the dbse to check if the data was stored
        // use template string on ref to access expense.id returned to action array 'action[0]'
        return database.ref(`user/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // done() moved here from below as then() in this code is async also
    }); 
});
// using 'done' tells jest the test is async, otherwise it will run before the 'expect'
// and possible pass if the code has no errors, though it will not check expect due to async
// when done is added as argu above, the test is not considered passed or failed until done() is called 

test('Should add expense with defaults data to database and store', (done) => {
    const store = createMockStore(defaultAuthState); // ensuring store has uid for state
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        // only passed in 1 item above so will be the 1st item 'action[0]'
        // 'expect.any(String)' uses expect to check for any string, this time id
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }           
        });
        
        return database.ref(`user/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done(); // done() moved here from below as then() in this code is async also
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });    
});
