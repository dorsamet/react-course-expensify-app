import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onMomentChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }

    onDescriptionChanged = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }))
    }

    onNoteChanged = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }))
    }

    onAmountChanged = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    }

    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount.' }))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input type="text" className="text-input" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChanged} />
                <input type="text" className="text-input" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChanged} />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onMomentChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onCalendarFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={(day) => false}
                />
                <textarea type="text" className="textarea" placeholder="Add a note for your expense" value={this.state.note} onChange={this.onNoteChanged}></textarea>
                <div>
                    <button className="button">Save expense</button>
                </div>
            </form>
        );
    }
}

export default ExpenseForm;