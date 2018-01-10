const __basedir = process.cwd();

const _ = require('lodash');
const i18nJSON = require('./i18n.json');

let i18nModule = (l) => {
    let i18n = i18nJSON[l] || i18nJSON.en;
    return i18n;
};

i18nModule.keys = () => _.keys(i18nJSON);

module.exports = i18nModule;