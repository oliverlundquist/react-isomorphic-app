var express = require('express')
var app = express()

// server
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// app
import App from '../common/App'

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

function handleRender(req, res) {
	// const preloadedState = { count: 5 }
	const store = createStore(counterReducer)
	const html = renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	)
	const finalState = store.getState()
	res.send(renderFullPage(html, finalState))
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
