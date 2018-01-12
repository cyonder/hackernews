import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

import Root from './components/Root';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);

registerServiceWorker();
