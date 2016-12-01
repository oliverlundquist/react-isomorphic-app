import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { configureStore } from '../../app/store'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import routes from '../../app/routes'
import { IntlProvider } from 'react-intl'
import { locales, getMessages } from '../../bootstrap/i18n'

test('Index route', () => {
	// navigate to uri
	hashHistory.push('/');

	// setup app
	const store = configureStore({ counter: { count: 5 } })
	const history = syncHistoryWithStore(hashHistory, store)
	const component = renderer.create(
		<Provider store={store}>
			<IntlProvider locale={locales[0]} messages={getMessages(locales[0])}>
				<Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
					{routes}
				</Router>
			</IntlProvider>
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('NotFound route', () => {
	// navigate to uri
	hashHistory.push('/some-route-that-doesnt-exist');

	// setup app
	const store = configureStore({ counter: { count: 5 } })
	const history = syncHistoryWithStore(hashHistory, store)
	const component = renderer.create(
		<Provider store={store}>
			<IntlProvider locale={locales[0]} messages={getMessages(locales[0])}>
				<Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
					{routes}
				</Router>
			</IntlProvider>
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Users route', () => {
	// navigate to uri
	hashHistory.push('/users');

	// setup app
	const store = configureStore({ counter: { count: 5 } })
	const history = syncHistoryWithStore(hashHistory, store)
	const component = renderer.create(
		<Provider store={store}>
			<IntlProvider locale={locales[0]} messages={getMessages(locales[0])}>
				<Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
					{routes}
				</Router>
			</IntlProvider>
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
