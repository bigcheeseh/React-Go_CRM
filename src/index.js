import React from "react";
import ReactDOM from "react-dom";
import Routes from "./router/index";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import logger from 'redux-logger';
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import reducers from "./reducers/rootReducer";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider>,
    document.querySelector('#root')
);


