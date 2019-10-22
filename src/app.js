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
import './firebase/firebase';



// the 'const store' has been set up to the configureStore func imported above, 
// which has the 'exported default' store codes returned. Giving acces to store.getState()
// store.dispatch etc.
const store = configureStore();

// the store attribute just requires the name of the store to parse, 
// in this case 'store' above 'const store'
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
