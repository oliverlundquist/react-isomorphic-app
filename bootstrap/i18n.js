import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);

// this constant is used in the LocaleMiddleware
export const locales = ['en', 'ja']
