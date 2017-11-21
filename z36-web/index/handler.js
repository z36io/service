var pug = require('pug');

module.exports.hello = (event, context, callback) => {
  var i18n = require('./i18n.json').en;
  var html = pug.renderFile(__dirname + '/template.pug', {
    title: i18n.title,
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
