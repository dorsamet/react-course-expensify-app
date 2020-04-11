import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount == 1 ? 'expense' : 'expenses';
    return (
        <div>
            <h2>Viewing {expenseCount} {expenseWord} totalling {numeral(expensesTotal / 100).format('$0,0.00')}</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesTotal: selectExpensesTotal(visibleExpenses),
        expenseCount: visibleExpenses.length
    }
};

export default connect(mapStateToProps)(ExpensesSummary);