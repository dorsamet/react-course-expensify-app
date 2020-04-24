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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div>
                    <div className="content-container">
                        <ExpenseForm
                            expense={this.props.expense}
                            onSubmit={this.onSubmit} />
                        <button className="button button--secondary" onClick={this.startRemoveExpense}>Remove Expense</button>
                    </div>
                </div>
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
