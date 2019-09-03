import {addExpense, editExpense, removeExpense} from '../../actions/expenses';


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

test('should setup the add expense action object with values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'Last month expense', 
        amount: 109500, 
        createdAt: 1000
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup the add expense action object with default values', () => {
    const expenseData = {
       
    } 
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description:'', 
            note: '', 
            amount: 0, 
            createdAt: 0            
        }
    })
});