import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';



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

// need to render app once
let hasRendered = false;
// this will render the app one time only
// if not renedered, then render. else do nothing
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    };
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// onAuthStateChanged() takes a callback function, which runs when the auth status change.
// when user goes fron unauth to authenticate or the reverse.
firebase.auth().onAuthStateChanged((user) => {
    // if there is user, then, they just logged in, else no user, they've logged out
    if (user) {
        store.dispatch(login(user.uid));
        // then() Promise is able to be used here due to 'return' keyword used
        // in startSetExpense 'return database.ref('expenses')...' in actions => expenses.js
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });       
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }

}); 


