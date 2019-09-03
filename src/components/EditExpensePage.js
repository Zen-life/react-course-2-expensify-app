import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
 
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.removeExpense({ id: this.props.expense.id });
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
    // the props is required (according to Insctructor) to pass data returned by the Object in the removeExpense() above
    // Although my test showed it works fine without the passing id and expense.
const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);