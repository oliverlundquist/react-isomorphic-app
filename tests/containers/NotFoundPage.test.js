import React from 'react'
import renderer from 'react-test-renderer'
import { NotFoundPage } from '../../app/containers';

test('Index page should show welcome text', () => {
	const component = renderer.create(
		<NotFoundPage />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
