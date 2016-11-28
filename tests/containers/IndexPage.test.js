import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { IndexPage } from '../../app/containers';
import { configureStore } from '../../app/store'

test('Index page should show welcome text', () => {
	const store = configureStore({ counter: { count: 5 } })
	const component = renderer.create(
		<Provider store={store}>
			<IndexPage />
		</Provider>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
