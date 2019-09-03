import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense} from '../actions/expenses';

//the 'export' class enables testing this unconnect class, 
// rather than the export default one
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {                
        this.props.addExpense(expense); 
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    // the goal is to return an object
    // inside return, we can define various props to call dispatch
    addExpense: (expense) => dispatch(addExpense(expense))
});
    
export default connect(undefined, mapDispatchToProps)(AddExpensePage);