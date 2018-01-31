import React from 'react';
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import {
	Provider
} from 'react-redux';
import {
	render
} from 'react-dom';
import configureStore from './utils/configureStore';
import routes from './routes';
import App from './modules/App';

const store = configureStore();
render(
	<Provider store={store}>
		<Router 
			history={hashHistory}
			routes={routes(store)}> 
		</Router>
	</Provider>,
	document.getElementById('app')
);