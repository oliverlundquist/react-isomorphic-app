import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import FaviconMiddleware from './middleware/FaviconMiddleware'
import routes from '../app/routes'
import { configureStore } from '../app/store'
import { Provider } from 'react-redux'

const express = require('express')
const app = express()
const initialState = {
	counter: { count: 5 }
	// movies: {
	// 	movies: [],
	// 	isFetching: false,
	// 	errorMessage: null,
	// 	firstName: null,
	// 	lastName: null,
	// 	email: null
	// }
};

app.use(FaviconMiddleware)
app.use(express.static('public'))
app.use(handleRender)

function handleRender(req, res) {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		// error response
		if (error !== null) {
			return res.status(500).send(error.message)
		}
		// redirect response
		if (redirectLocation !== null) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		}
		// normal response
		const store = configureStore(initialState)
		const html = renderToString(
			<Provider store={store}>
				<RouterContext {...renderProps} />
			</Provider>
		)
		const finalState = store.getState()
		res.status(200).send(renderFullPage(html, finalState))
	})
}

function renderFullPage(html, preloadedState) {
	return `<!doctype html>
<html>
	<head>
		<title>Redux Universal Example</title>
	</head>
	<body>
		<div id="app">${html}</div>
		<script>
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
		</script>
		<script src="/scripts/bundle.js"></script>
	</body>
</html>
`
}

app.listen(3000, function () {
	console.log('Server is listening on port 3000!')
})
