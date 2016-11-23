import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger'
import invariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import * as reducers from './reducers'

export const configureStore = (initialState) => {
	// TODO: move logic to external module and refine validation logic
	const environment = process.env.APP_ENV || 'development'
	const isClient = () => typeof window !== 'undefined'
	const isServer = () => ! isClient()

	const enhancer = (environment === 'development' && isClient() === true)
		? composeWithDevTools({ realtime: true, port: 3001 })(applyMiddleware(invariant(), createLogger(), thunk))
		: applyMiddleware(thunk)

	return createStore(
		combineReducers(Object.assign({ routing: routerReducer }, reducers)),
		initialState,
		enhancer
	)
}
