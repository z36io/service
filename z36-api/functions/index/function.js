const __basedir = process.cwd();

const AWS = require('aws-sdk');
const lib = require(__basedir + '/components/template.js');

module.exports.handler = (event, context, callback) => {
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
