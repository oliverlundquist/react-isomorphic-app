import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { IndexPage } from '../../app/containers';
import { configureStore } from '../../app/store'
import { IntlProvider } from 'react-intl'
import { locales, getMessages } from '../../bootstrap/i18n'

test('Index page should show welcome text', () => {
	const store = configureStore({ counter: { count: 5 } })
	const component = renderer.create(
		<Provider store={store}>
			<IntlProvider locale={locales[0]} messages={getMessages(locales[0])}>
				<IndexPage />
			</IntlProvider>
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
