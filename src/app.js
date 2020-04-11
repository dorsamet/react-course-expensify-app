import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import './styles/styles.scss';
import 'normalize.css';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({
    description: 'Water Bill',
    note: 'I paid',
    createdAt: 2,
    amount: 400
}));

store.dispatch(addExpense({
    description: 'Gas Bill',
    note: 'She paid',
    createdAt: 500,
    amount: 300
}));

store.dispatch(addExpense({
    description: 'Rent',
    note: 'I paid',
    createdAt: 1000,
    amount: 109500,
}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));