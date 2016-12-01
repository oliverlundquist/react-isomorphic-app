import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger'
import invariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import * as reducers from './reducers'
import { reducer as api } from 'redux-json-api-without-credentials'

export const configureStore = (initialState) => {
	// TODO: move logic to external module and refine validation logic
	const environment = process.env.NODE_ENV || 'development'
	const isClient = () => typeof window !== 'undefined' && environment !== 'testing'
	const isServer = () => ! isClient()

	const enhancer = (environment === 'development' && isClient() === true)
		? composeWithDevTools({ realtime: true, port: 3001 })(applyMiddleware(invariant(), createLogger(), thunk))
		: applyMiddleware(thunk)

	return createStore(
		combineReducers({ routing: routerReducer, api: api, ...reducers }),
		initialState,
		enhancer
	)
}
