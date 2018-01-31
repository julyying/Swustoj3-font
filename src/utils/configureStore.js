import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initState) {
	let middleware = [thunk];
	let finalCreateStore = applyMiddleware(...middleware)(createStore);
	let store = finalCreateStore(rootReducer, initState);
	return store;
}