import { locales, localeIsValid, getMessages } from '../i18n'

const LocaleMiddleware = (req, res, next) => {
	const pathFragments = req.path.split('/')
	const foundLocales  = pathFragments.filter(path => localeIsValid(path));
	const locale        = foundLocales.length > 0 ? foundLocales[0] : locales[0]
	const messages      = getMessages(locale)

	req.i18n = { locale: locale, messages: messages }
	next()
}

export default LocaleMiddleware
