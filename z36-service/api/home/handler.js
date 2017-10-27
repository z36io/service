var lib = require('../../lib/template.js');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: lib.message,
      input: event,
    }),
  };

  callback(null, response);

};