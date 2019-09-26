export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((total, value) => total + value, 0);
};

// selectExpensesTotal