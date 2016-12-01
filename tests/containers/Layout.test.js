import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { Layout, IndexPage } from '../../app/containers';
import { configureStore } from '../../app/store'
import { IntlProvider } from 'react-intl'

test('Layout with childview', () => {
	const store = configureStore({ counter: { count: 5 } })
	const component = renderer.create(
		<Provider store={store}>
			<IntlProvider locale="en">
				<Layout>
					<IndexPage />
				</Layout>
			</IntlProvider>
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Layout without childview', () => {
	const store = configureStore({ counter: { count: 5 } })
	const component = renderer.create(
		<Provider store={store}>
			<Layout />
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
