import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import SelectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';



export const ExpensesSummary = (props) => (
    <div>
        {
            props.expenses.length <= 1 ? (
            <p>Viewing {props.expenses.length} expense totalling {numeral(selectExpensesTotal(props.expenses) / 100).format('0,0.00')}</p>
           ) : (
                <p>Viewing {props.expenses.length} expenses totalling {numeral(selectExpensesTotal(props.expenses) / 100).format('0,0.00')}</p>
           )
        }
    </div>
);

const mapStatetoProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters),
        expensesTotal: selectExpensesTotal(state.expenses)
    };
};

// the below is norm way of mapping state to props
export default connect(mapStatetoProps)(ExpensesSummary);
