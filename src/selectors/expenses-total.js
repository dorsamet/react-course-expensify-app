const selectExpensesTotal = (expenses) => {
    if (expenses.length == 0) {
        return 0;
    }
    
    return expenses
    .map((expense) => expense.amount)
    .reduce((acc, next) => acc + next);
}

export default selectExpensesTotal;