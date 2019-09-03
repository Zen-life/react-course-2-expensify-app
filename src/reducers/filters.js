import moment from 'moment';


// Filter reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':              
            return {
                ...state,
               text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
            sortBy: 'amount'   
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }; 
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }; 
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };    
        default: 
        return state;
    }
};

// note, the 'export default filtersReducer' could have been done here
// or as is above by appending it straight to the arrow function