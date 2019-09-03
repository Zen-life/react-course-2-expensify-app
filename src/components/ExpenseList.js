import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? ( 
                <p>No Expenses</p> 
                ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />; 
                })
            )
        }
    </div>
);
const mapStatetoProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
};

// the below is norm way of mapping state to props
export default connect(mapStatetoProps)(ExpenseList);
