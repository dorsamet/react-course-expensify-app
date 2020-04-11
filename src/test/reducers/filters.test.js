import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {
        type: '@@INIT'
    })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        endDate: moment().endOf('month'),
        startDate: moment().startOf('month')
    })
})

test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {
        type: 'SORT_BY_DATE'
    };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('Should set textFilter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'value'
    }
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('value')
});

test('Should set startDate filter', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment(0)
    }
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(0))
});

test('Should set endDate filter', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment(0)
    }
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(0))
});