import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

// if REDUX.. is available use it, else use compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// wrapping the store code inside the 'export default' and returning 'store' means that
// when the configureStore is imported and 'export default is called, it returns the store
export default () => {
    // store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

