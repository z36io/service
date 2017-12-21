const __basedir = process.cwd();

const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

module.exports = (params, callback) => {
  SNS.publish(params, (error) => {
    if (error) {
      return callback(error, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
    }

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(params),
    });

  });
};
