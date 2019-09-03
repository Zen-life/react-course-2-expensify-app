import moment from 'moment';
import filtersReducer from '../../reducers/filters';


// undefined is used for default as not parsing any values. action is an an object
// @@init is what is passed first when viewed npm dev-server in browser => Redux inspector
// moment() start from current moment, moment(0) start from 1970
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@init' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
 const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
 expect(state.sortBy).toBe('amount');
});

// as the norm is sorted by date. we provide a new current state and set it to amount
// then when the action code runs dispatches, we can see it change to date
test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'This is my filter';
    const action = { 
        type: 'SET_TEXT_FILTER',
        text
     };
     const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

test('should set startDate filter', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    }
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

test('should set endDate filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    }
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});

