import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render Add Expense Page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onsubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]); // () calling with data that gets passed.
    expect(history.push).toHaveBeenLastCalledWith('/'); // now if history.push path alters in AddExpensePage, test will fail 
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]); // called with data parsed onSubmit above
});