import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Layout, IndexPage, Users, NotFoundPage, Products } from '../app/containers'
import { locales, localeIsValid } from '../bootstrap/i18n'

const checkIfValidLocale = (nextState, replace) => {
	if (! localeIsValid(nextState.params.lang)) {
		replace(locales[0]) // redirect to default language
	}
}
// <Route path=":lang" onEnter={checkIfValidLocale}>

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={IndexPage} />
		<Route path="users" component={Users} />
		<Route path="products" component={Products} />
		{locales.map((locale, i) => (
			<Route path={locale} key={`${locale}_${i}`}>
				<IndexRoute component={IndexPage} />
				<Route path="users" component={Users} />
				<Route path="products" component={Products} />
			</Route>
		))}
		<Route path="*" component={NotFoundPage} />
	</Route>
)

export default routes;
