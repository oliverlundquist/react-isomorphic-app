import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { Counter } from '../../app/components'
import { configureStore } from '../../app/store'
import * as Actions from '../../app/actions'
import { IntlProvider } from 'react-intl'
import { locales, getMessages } from '../../bootstrap/i18n'

test('Counter should increment when incrementing', () => {
	const store = configureStore({ counter: { count: 5 } })
	const component = renderer.create(
		<Provider store={store}>
			<IntlProvider locale={locales[0]} messages={getMessages(locales[0])}>
				<Counter />
			</IntlProvider>
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	store.dispatch(Actions.increment());
	store.dispatch(Actions.increment());

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
