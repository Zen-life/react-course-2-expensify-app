import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// enable mock store const to be called by any test that needs it
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
    const
     action = editExpense('123abc', { note: 'New note value' });
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