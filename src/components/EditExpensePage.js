import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
 
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>                
                <ExpenseForm
                expense={this.props.expense}
                onSubmit={this.onSubmit}
                />
    
                <button             
                onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
};



// we need to search for expenses whose id match 'props.match.params.id'
// to access the details we need access to props, hence the 2nd props arg below
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)        
    }
};


    // the goal is to return an object
    // inside return, we can define various props to call dispatch
    // the props is required (according to Insctructor) to pass data returned by the Object in the startRemoveExpense() above
    // Although my test showed it works fine without the passing id and expense.
const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);