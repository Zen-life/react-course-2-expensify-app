import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import SelectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';


// destructured these variables: expenseCount, expensesTotal
export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount <= 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('0,0.00');

    return(
        <div>
        <p>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</p>
        </div>
    );
};



const mapStatetoProps = (state) => {
    const visibleExpenses = SelectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

// the below is norm way of mapping state to props
export default connect(mapStatetoProps)(ExpensesSummary);
