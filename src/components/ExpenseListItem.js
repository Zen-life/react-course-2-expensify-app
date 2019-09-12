import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';



// same as below but destructured here
// parse createdAt to moment and set format. amount to numeral
const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
        <p>
        {numeral(amount / 100).format('0,0.00')} 
        - 
        {moment(createdAt).format('MMMM Do, YYYY')} 
        </p>        
    </div>
);

/*
const ExpenseListItem = (props) => (
    <div>
        <h3>{props.description}</h3>
        <p>{props.amount} - {props.createdAt}</p>

    </div>
);
*/



export default ExpenseListItem;