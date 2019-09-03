import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    // this is a regular html5 header tag
    <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </header>
);

export default Header;