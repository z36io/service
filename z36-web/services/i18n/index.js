module.exports = (l) => {
    
    var i18nJSON = require('./i18n.json');
    var i18n = i18nJSON[l] || i18nJSON.en;

    return i18n;

};
