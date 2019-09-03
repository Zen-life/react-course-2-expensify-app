import React from 'react';
import { Link } from 'react-router-dom';



// same as below but destructured here
const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
        <p>{amount} - {createdAt}</p>        
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