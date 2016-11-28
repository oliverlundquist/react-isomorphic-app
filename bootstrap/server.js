import React from 'react'
import helmet from 'helmet';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import FaviconMiddleware from './middleware/FaviconMiddleware'
import routes from '../app/routes'
import { configureStore } from '../app/store'
import { Provider } from 'react-redux'

const qs = require('qs');
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

// expressjs middlewares
app.use(require('response-time')());

// helmet middlewares / security
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.disable('x-powered-by');

app.get('/callback', function (req, res) {
	const parameters    = qs.parse(req.query) // never trust incoming parameters, parseInt them or something
	const grant_type    = 'authorization_code'
	const client_id     = process.env.CLIENT_ID
	const client_secret = process.env.CLIENT_SECRET
	const redirect_uri  = process.env.REDIRECT_URI || 'http://localhost/callback'
	const code          = parameters.code

	res.send('make a post request, store token in localStorage and redirect to index')
})

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
