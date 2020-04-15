import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    startRemoveExpense = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id })
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit} />
                    <button onClick={this.startRemoveExpense}>Remove Expense</button>
            </div>
    
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => (
    {
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
        startEditExpense: (id, updates) => {
            dispatch(startEditExpense(id, updates))
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
