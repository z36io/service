var lib = require('../lib/template.js');
var pug = require('pug');

module.exports.hello = (event, context, callback) => {
  var html = pug.renderFile(__dirname + '/template.pug', { name: lib.message });
  var response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: html
  };

  callback(null, response);

};
