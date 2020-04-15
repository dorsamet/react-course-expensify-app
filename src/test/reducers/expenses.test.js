import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
})

test('Should remove expense with valid id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        expenses[1], expenses[2]
    ])
})

test('Should not remove expense with invalid id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})

test('Should add an expense', () => {
    const expense = {
        id: '109',
        description: 'Laptop',
        note: '',
        createdAt: 20000,
        amount: 40000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses, expense])
});

test('Should edit an expense', () => {
    const edits = {
        amount: 45000
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: edits
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(45000)
});

test('Should not edit expense if expense not found', () => {
    const edits = {
        description: 'Invalid expense'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: edits
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});

test('Should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
})