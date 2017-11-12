var lib = require('../common/template.js');

module.exports.hello = (event, context, callback) => {
  var response = {
    statusCode: 200,
    body: JSON.stringify({
      message: lib.message,
      event: event,
      context: context
    }),
  };

  callback(null, response);

};