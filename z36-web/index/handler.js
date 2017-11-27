var pug = require('pug');
var _ = require('lodash');

module.exports.hello = (event, context, callback) => {

  var l = _.get(event, 'queryStringParameters.l') || 'en';
  var i18nJSON = require('./i18n.json');
  var i18n = i18nJSON[l] || i18nJSON.en;
  var html = pug.renderFile(__dirname + '/template.pug', {
    i18n: i18n
  });
  var response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: html
  };

  callback(null, response);

};
