import { createStore } from 'redux';


//action generators - functions that return action objects
// payload ref to incrementBy. if payload has a value use it
// if none, defaults to empty object. empty object required to avoid error
const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy
    });


// action generator for decrement
const decrementCount = ({ decrementBy = 1} = {}) =>({
    type: 'DECREMENT',
    decrementBy
});

// no need to set default value or empty object, as value is hard set to count in call. 
const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers
// 1. reducers are pure functions
// 2. Never change state and action directly
countReducer = (state = {count: 0 }, action) => {
    console.log('running');
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};

// createStore always expect arguement(s), hence a function
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));

// action generators makes it easy to pickup errors in code
// passing in the incrementBy as arguement
store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch( decrementCount());

store.dispatch( decrementCount({ decrementBy: 10 }));

store.dispatch( setCount({ count: 101 }));

