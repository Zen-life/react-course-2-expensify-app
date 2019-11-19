import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
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

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// then() Promise is able to be used here due to 'return' keyword used
// in startSetExpense 'return database.ref('expenses')...' in actions > expenses.js
store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});


