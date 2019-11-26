import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
        startEditExpense={startEditExpense}
        startRemoveExpense={startRemoveExpense}
         history={history} 
         expense={expenses[2]}
         />);
});


test('should render Edit Expense Page correctly', () => {
     expect(wrapper).toMatchSnapshot();    
});

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]); // () calling with data that gets passed.
    expect(history.push).toHaveBeenLastCalledWith('/'); // now if history.push path alters in EditExpensePage, test will fail 
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]); // called with data parsed onSubmit above
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/'); // now if history.push path alters in AddExpensePage, test will fail 
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[2].id}); // called with data parsed onSubmit above
});