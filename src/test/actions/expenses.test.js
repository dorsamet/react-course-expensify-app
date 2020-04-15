import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk])


beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    })
    database.ref('expenses').set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        id: '123abc',
        type: 'REMOVE_EXPENSE'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {
        description: 'new description',
        note: 'new note value'
    })
    expect(action).toEqual({
        id: '123abc',
        type: 'EDIT_EXPENSE',
        updates: {
            description: 'new description',
            note: 'new note value'
        }
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('Should add expense to database and store', async (done) => {
    const store = createMockStore({});
    const expenseData = { description: 'Mouse', amount: 3000, note: 'This one is better', createdAt: 1000 }
    await store.dispatch(startAddExpense(expenseData));
    const actions = store.getActions();
    const snapshot = await database.ref(`expenses/${actions[0].expense.id}`).once('value')
    expect(snapshot.val()).toEqual(expenseData);
    done();
});


test('Should add expense with defaults to database and store', async (done) => {
    const store = createMockStore({});
    const expenseData = { }
    await store.dispatch(startAddExpense(expenseData));
    const actions = store.getActions();
    const snapshot = await database.ref(`expenses/${actions[0].expense.id}`).once('value')
    expect(snapshot.val()).toEqual({ description: '', note: '', amount: 0, createdAt: 0 });
    done();
});

test('Should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('Should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
})