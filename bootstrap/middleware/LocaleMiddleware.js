import { locales } from '../i18n'

const LocaleMiddleware = (req, res, next) => {
	const pathFragments = req.path.split('/')
	const foundLocales  = pathFragments.filter(function(path) { return locales.indexOf(path) !== -1; });
	const locale        = foundLocales.length > 0 ? foundLocales[0] : 'en'
	const messages      = require(`../../lang/${locale}`)

	req.i18n = { locale: locale, messages: messages }
	next()
}

export default LocaleMiddleware
