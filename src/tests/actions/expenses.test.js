import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// enable mock store const to be called by any test that needs it
const createMockStore = configureMockStore([thunk]);

// this will run before each test case. so the last data 
// in th dbse is the last test case that run
beforeEach((done) => {
    const expensesData = {};
        expenses.forEach(({ id, description, note, amount, createdAt }) => {
            expensesData[id] = { description, note, amount, createdAt };
        });    
    database.ref('expenses').set(expensesData).then(() => done());
});

// the functions are in file imported above. So just call it in test
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
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

test('should setup the add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'Last month expense', 
        amount: 109500, 
        createdAt: 1000
    };
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('Should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        // only passed in 1 item above so will be the 1st item 'action[0]'
        // 'expect.any(String)' uses expect to check for any string, this time id
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }           
        });
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // done() moved here from below as then() in this code is async also
    });
});

// testing with async operation Promise is used to check sync before certian codes run
test('Should add expense with default data to database and store', (done) => {
    const store = createMockStore({});
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
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done(); // done() moved here from below as then() in this code is async also
    });
});

test('should setup set expenses action object with data', () => {
 const action = setExpenses(expenses);
 expect(action).toEqual({
     type: 'SET_EXPENSES',
     expenses
 });
});

// the dispatch goes and fetch the dummy data setup right above at beforeEach
// then() waits for the data to be fetched before it fires it codes within
// 'done' in the test ensure jest doesn't pass of fail the test until done is called
test('should fetch the expenses from firebase ', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions(); // should be only one action
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        }); // expect first and only action to be SET_EXPENSES and the expense(s) it has
        done(); // call done() to fire as we've finished.
    });
});