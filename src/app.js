import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

// the 'const store' has been set up to the configureStore func imported above, 
// which has the 'exported default' store codes returned. Giving acces to store.getState()
// store.dispatch etc.
const store = configureStore();

console.log(store.getState());

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

store.dispatch(addExpense({description: 'Water bill', amount: 100, createdAt: -21000})); 
store.dispatch(addExpense({description: 'Gas bill', amount: 120, createdAt: 1000}));
store.dispatch(addExpense({description: 'Rent', amount: 109500, createdAt: -24000})); 


// no longer needed as filter is now set via the text input filed. so commenting out
/*
store.dispatch(setTextFilter('gas'));

setTimeout(() => {
    store.dispatch(setTextFilter('water'));
}, 3000)
*/


// the wrapper component goes straight into ReactDOM.render
const appRoot = document.getElementById('app');

// the store attribute just requires the name of the store to parse, 
// in this case 'store' above 'const store'
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, appRoot);
