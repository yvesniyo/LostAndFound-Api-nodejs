const i18n = require('i18n')
const path = require('path');

i18n.configure({
    locales: ['en', 'fr', 'kin'],
    defaultLocale: 'en',
    queryParameter: 'lang',
    directory: path.join('./', 'locales'),
    api: {
        '__': 'translate',
        '__n': 'translateN'
    },
});

module.exports = i18n;