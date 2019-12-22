import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import SelectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';


// destructured these variables: expenseCount, expensesTotal
export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount <= 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return(
        <div className="page-header">
            <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expenses</Link>
            </div>
            </div>        
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
