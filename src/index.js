import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';
// store is a front end database where all the state values will be stored.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
            <Provider store ={store}>
                <App />
            </Provider>,
             document.querySelector('#root'));
