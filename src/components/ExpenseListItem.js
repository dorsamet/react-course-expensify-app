import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ description, amount, createdAt, id }) => {
    return (
        <Link to={`/edit/${id}`} className="list-item">
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__subtitle">{moment(createdAt).format('MMMM Do YYYY')}</span>
            </div>
            <div>
                <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
            </div>
        </Link>
    );
}

export default ExpenseListItem;