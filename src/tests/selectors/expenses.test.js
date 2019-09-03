import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

// need to create test data to use for diff filters, heance array now in fixtures folder
// valueOf enables us to get a number or normal timestamp back

 // each test can defined its own filter. here 'e' pull in descp for id 2 and 3
test('should filter by text vaue', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters); // parse in expenses test data above and filters
    expect(result).toEqual([expenses[2], expenses[1]]); // we expect the above array test data back, hence array
});

test('should filter by start date', () => {
    // each test can defined its own filter. with startDate of 0, array o and 2 will dispaly
    // array expense[0] has 0 createdAt date. expense[2] is in fuuture, so will also show
    // nb. the are auto sorted by date, so expense[2] comes first before expense[0] 
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

// add 2 days. Will filter out items created further than 2days from this point moment(0) in time.
test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);

});

test('should filter by sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should filter by sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});