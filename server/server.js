var express = require('express')
var app = express()

// server
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext, Router, Route, IndexRoute, browserHistory } from 'react-router'

// app
import App from '../common/App'
import Users from '../common/Users'

app.use((req, res, next) => {
	if (req.url === '/favicon.ico') {
		res.type('image/x-icon')
		res.status(301)
		res.end()
		return
	}
	next()
})
app.use(express.static('client'))
app.use(handleRender)

function counterReducer(state = { count: 0 }, action) {
	const count = state.count
	switch (action.type) {
	case 'increase':
		return { count: count + 1 }
	default:
		return state
	}
}

const routes = <Router>
				<Route path='/' component={App} />
				<Route path='/users' component={Users} />
			</Router>

function handleRender(req, res) {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			const store = createStore(counterReducer)
			const html = renderToString(
				<Provider store={store}>
					<RouterContext {...renderProps}>
						<App />
					</RouterContext>
				</Provider>
			)
			const finalState = store.getState()
			res.status(200).send(renderFullPage(html, finalState))
		} else {
			res.status(404).send('Not found')
		}
	})
}

function renderFullPage(html, preloadedState) {
	return `
		<!doctype html>
		<html>
			<head>
				<title>Redux Universal Example</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
				</script>
				<script src="/bundle.js"></script>
			</body>
		</html>
	`
}

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})
