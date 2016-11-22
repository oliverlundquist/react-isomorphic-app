// import 'babel-polyfill'
import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from '../common/App'
import Users from '../common/Users'

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
		<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)} >
			<Route path='/' component={App} />
			<Route path='/users' component={Users} />
		</Router>
	</Provider>,
	rootElement
)
