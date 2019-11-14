import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// enable mock store const to be called by any test that needs it
// then parse in the middleware we want to use 'thunk'
const createMockStore = configureMockStore([thunk]);

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

test('should setup add expense action object with provided values', () => {
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
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // done() moved here from below as then() in this code is async also
    }); 
});
// using 'done' tells jest the test is async, otherwise it will run before the expect
// and possible pass if the code has no errors, though it will not check expect due to async
// when done is added as argu above, the test is not considered passed or failed until done() is called 

test('Should add expense with defaults data to database and store', (done) => {
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

// test('should setup the add expense action object with default values', () => {
//     const expenseData = {
       
//     } 
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description:'', 
//             note: '', 
//             amount: 0, 
//             createdAt: 0            
//         }
//     })
// });