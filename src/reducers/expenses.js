// no import as there is no dependancies

// Expense reducer
const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
          return [
            ...state,
            action.expense
          ];
        case 'REMOVE_EXPENSE':          
          return state.filter(({ id }) => {
            return id !== action.id;
          }); 
          case 'EDIT_EXPENSE':
          return state.map((expense) => {
            if (expense.id === action.id) {
                return {
                    ...expense,
                    ...action.updates
                };
            } else {
                return expense;
            }
          });
          case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

// note, the 'export default expensesReducer' could have been done here
// or as is above by appending it straight to the arrow function