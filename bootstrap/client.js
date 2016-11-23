// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import { configureStore } from '../app/store'
import routes from '../app/routes'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('app')

render(
	<Provider store={store}>
		<Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
			{routes}
		</Router>
	</Provider>,
	rootElement
)
