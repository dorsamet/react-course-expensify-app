import { createStore } from 'redux';

const incrementGenerator = ({ incrementBy = 1 } = {  }) => (
    {
        type: 'INCREMENT',
        incrementBy
    }
);

const decrementGenerator = ({ decrementBy = 1 } = {  }) => (
    {
        type: 'DECREMENT',
        decrementBy
    }
);

const set = ({ count = 1 } = {  }) => (
    {
        type: 'SET',
        count
    }
);


const reset = () => (({
    type: 'RESET'
}));

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() => {
    console.log(`subscribe: ${JSON.stringify(store.getState())}`);
})

store.dispatch(incrementGenerator({ incrementBy: 1 }))

store.dispatch(incrementGenerator({incrementBy: 2 }))
store.dispatch(incrementGenerator({ incrementBy: 5 }));
store.dispatch(decrementGenerator({ decrementBy: 3 }))
store.dispatch(decrementGenerator({ decrementBy: 1 }))

store.dispatch(reset())
store.dispatch(set({count: 101}))