import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('Should return 0, if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});


test('Should correctly add up to a single expense', () => {
    let res = selectExpensesTotal([expenses[0]]); // parsing one expense into new array
    expect(res).toBe(195);
});


test('Should correctly add up multiple expenses', () => {
   const res = selectExpensesTotal(expenses) / 100;
    expect(res).toBe(1141.95);
});