import moment from 'moment';

// get visible Expenses - 
// this will help the filter to show only expense that applies
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // if not numb, condi eq true do nothing. 
        // only use it, if a numb
        const createdAtMoment = moment(expense.createdAt); // parse in the value of expense.createdAt
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch =  endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true;
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());
        
        // if all true, keep item in array. 
        // if any is false, condi eq false; then remove item from array.
        return startDateMatch && endDateMatch && textMatch; 
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// note, the 'export default getVisibleExpenses' could have been done here
// or as is above by appending it straight to the arrow function