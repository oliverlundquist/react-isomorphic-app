// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'
import { configureStore } from '../app/store'
import routes from '../app/routes'
import { RadiumProvider } from '../app/providers'
import { IntlProvider, addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);


const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('app')

// TODO: store jwt token in localstorage if available

render(
	<RadiumProvider>
		<Provider store={store}>
			<IntlProvider locale="ja" messages={{"test1": "Text 1", "test2": "Text 2"}}>
				<Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
					{routes}
				</Router>
			</IntlProvider>
		</Provider>
	</RadiumProvider>,
	rootElement
)
