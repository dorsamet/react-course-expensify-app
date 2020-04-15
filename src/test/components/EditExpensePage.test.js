import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() }
    wrapper = shallow(<EditExpensePage
        expense={expenses[2]}
        startEditExpense={startEditExpense}
        startRemoveExpense={startRemoveExpense}
        history={history} />)
})

test('Should render EditExpensePageCorrectly correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('Should handle startEditExpense when onSubmit is called', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2])
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
})

test('Should handle startRemoveExpense when onRemove is called', () => {
    wrapper.find('button').simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
})