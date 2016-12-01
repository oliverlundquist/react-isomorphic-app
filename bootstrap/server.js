import React from 'react'
import helmet from 'helmet';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import FaviconMiddleware from './middleware/FaviconMiddleware'
import RedisVerifierMiddleware from './middleware/RedisVerifierMiddleware'
import LocaleMiddleware from './middleware/LocaleMiddleware'
import routes from '../app/routes'
import { configureStore } from '../app/store'
import { Provider } from 'react-redux'
import { RadiumProvider } from '../app/providers'
import { IntlProvider, addLocaleData } from 'react-intl'
import axios from 'axios'

// /////// //
// LOCALES //
// /////// //
// import en from 'react-intl/locale-data/en';
// import ja from 'react-intl/locale-data/ja';
// addLocaleData([...en, ...ja]);
const locales = ['en', 'ja']

// ///////// //
// EXPRESSJS //
// ///////// //
const qs = require('qs');
const i18n = require('./i18n')
const express = require('express')
const session = require('express-session')
const request = require('request')
const RedisStore = require('connect-redis')(session);
const app = express()

// ////////// //
// MIDDLEWARE //
// ////////// //
app.use(session({
	secret: process.env.SESSION_SECRET || 'keyboard-cat',
	saveUninitialized: false,
	resave: false,
	store: new RedisStore({ host: '0.0.0.0', prefix: 'session:' })
}))
app.use(require('response-time')());

// /////////////////// //
// SECURITY MIDDLEWARE //
// /////////////////// //
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.disable('x-powered-by');

// ///////////////// //
// CUSTOM MIDDLEWARE //
// ///////////////// //
app.use(FaviconMiddleware)
app.use(RedisVerifierMiddleware)
app.use(LocaleMiddleware)
app.use(express.static('public'))

// /////////////// //
// OAUTH2 CALLBACK //
// /////////////// //
app.get('/callback', function (req, res, next) {
	const url           = 'http://passport.dev:8000/oauth/token'
	const parameters    = qs.parse(req.query) // never trust incoming parameters, parseInt them or something
	const data          = {
		grant_type:    'authorization_code',
		client_id:     process.env.OAUTH2_CLIENT_ID,
		client_secret: process.env.OAUTH2_CLIENT_SECRET,
		redirect_uri:  process.env.OAUTH2_REDIRECT_URI,
		code:          decodeURIComponent(parameters.code)
	}
	request.post({ url: url, form: data }, function (error, response, body) {
		if (error) {
			return next(new Error(error))
		}
		if (response.statusCode === 400) {
			return next(new Error(response.body))
		}
		req.session.tokens = JSON.parse(response.body)
		return res.redirect(302, '/products')
	});
})

// /////////// //
// REACTJS APP //
// /////////// //
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
		axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUxNWQ5MTJhNmMzY2IyZDcwOWFlZDM5ZjUwNTE0YWFlNjhhNTM5ODhhNGVmMTEwOWJlNDI0ZWIwYWIwMzA0M2JhM2M4NWU3NTM4MGFhYTcxIn0.eyJhdWQiOiIyIiwianRpIjoiZTE1ZDkxMmE2YzNjYjJkNzA5YWVkMzlmNTA1MTRhYWU2OGE1Mzk4OGE0ZWYxMTA5YmU0MjRlYjBhYjAzMDQzYmEzYzg1ZTc1MzgwYWFhNzEiLCJpYXQiOjE0NzU3NTE1ODcsIm5iZiI6MTQ3NTc1MTU4NywiZXhwIjo0NjMxNDI4Nzg3LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXSwibm9fbXlzdG9yZV9ob3N0cyI6WyJjaGlwcyJdfQ.ep7f7aJgfdwnmBQMXrTHf-aMMYjx3pS4wCKOJ1tp42A9HehJTXXWq7vExxoziy5FmMvqOlvh9UdxUkpooz76M8VPxaFzkp3RRXM938AP_zKgGAv9wliQLAIGNE1tx1hlbaRzf6q6lzbWKbi-rb45GOc8C7CrR4rzpuJu8HbJk0ezovpy210lTuEl5aIWMHGqpNSLyjuN6tYHF3vAnKaj8Z9936sWy4KfHfTuWAqBDJwtTyt8WuwtlxA0fRGBePe8bSy7KaTskP2FmysAizbn0Tga0bADmvtlrarcrzMu--5ZxEGUad8D5nCI-FVNiLXPvei5X8TSxXl1HfRVob8PVlcbmB7iA5ogNfl3czGh_EFoO3w_0AFQ1sX6aYxqfoKKoqIsd0kR04kMFA9yE0TlOyDlUt6xpRmjAnXFuX2Hk5SUZ10HdfEC5Yo8tFobzOi1PjQktGlEPrQBMojUJk05otYFJ8YqSjt9Z0xOQhnnPyN4ZiD4XhV5RVBt7kTIX2QSG6Z0BzDcgOsSS0gCrcb3SMciE5VvHSc7N2TLVXM20fCyYRrtXLxpejuois_bKkKOLQ30Ch7eC-_t0QdSEC-XfIzVTbYdx_FWymwRmz_ASthuy2Zr_KQQSNI4XY7gu4gtMUQBYCG48D5Zp8Qh-c37r56EM_Sa9fnqLVZmfWrsJlo';
		axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
		axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
		axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';
		axios.get('https://api.mystore.no/shops/chips/products')
		.then(function (response) {
			const initialState = { counter: { count: 5 }, session: req.session, api: { products: response.data } }
			const store = configureStore(initialState)
			const html = renderToString(
				<RadiumProvider radiumConfig={{ userAgent: req.headers['user-agent'] }}>
					<Provider store={store}>
						<IntlProvider locale="ja" messages={{"test1": "Text 1", "test2": "Text 2"}}>
								<RouterContext {...renderProps} />
						</IntlProvider>
					</Provider>
				</RadiumProvider>
			)
			const finalState = store.getState()
			res.status(200).send(renderFullPage(html, finalState))
		})
		.catch(function (error) {
			console.log(error);
		});
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
			window.i18n = 'somemessages'
		</script>
		<script>
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
		</script>
		<script src="/scripts/bundle.js"></script>
	</body>
</html>
`
}

app.listen(8010, 'consumer.dev', function () {
	console.log('Server is listening on consumer.dev:8010')
})
