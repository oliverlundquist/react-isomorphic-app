import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Layout, IndexPage, Users, NotFoundPage } from '../app/containers'

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={IndexPage} />
		<Route path="users" component={Users} />
		<Route path="*" component={NotFoundPage} />
	</Route>
)

export default routes;
