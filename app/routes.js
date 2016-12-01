import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Layout, IndexPage, Users, NotFoundPage, Products } from '../app/containers'

const checkIfValidLocale = (nextState, replace) => {
	if (nextState.params.lang !== 'en') {
		replace('/en/users')
	}
}

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={IndexPage} />
		<Route path="users" component={Users} />
		<Route path="products" component={Products} />
		<Route path=":lang" onEnter={checkIfValidLocale}>
			<IndexRoute component={IndexPage} />
			<Route path="users" component={Users} />
			<Route path="products" component={Products} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Route>
)

export default routes;
