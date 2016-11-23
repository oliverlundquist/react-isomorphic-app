import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers'

const logger = createLogger();

export const configureStore = (initialState) => {
	return createStore(
		combineReducers(Object.assign({ routing: routerReducer }, reducers)),
		initialState,
		applyMiddleware(thunk, logger)
	)
}
