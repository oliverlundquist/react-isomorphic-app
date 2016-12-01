import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ja from 'react-intl/locale-data/ja'
import * as messages from '../lang'

addLocaleData([...en, ...ja]);

export const locales = ['en', 'ja']
export const localeIsValid = locale => locales.indexOf(locale) !== -1
export const getMessages = locale => messages[locale] || {}
