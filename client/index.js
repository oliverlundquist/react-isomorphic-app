// import 'babel-polyfill'
import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from '../common/App'

function counterReducer(state = { count: 0 }, action) {
	const count = state.count
	switch (action.type) {
	case 'increase':
		return { count: count + 1 }
	default:
		return state
	}
}

const preloadedState = window.__PRELOADED_STATE__
const store = createStore(counterReducer)
const rootElement = document.getElementById('app')

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	rootElement
)
