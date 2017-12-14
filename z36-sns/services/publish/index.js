const __basedir = process.cwd();

const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

module.exports = (params, next) => {
  SNS.publish(params, (error) => {
    if (error) {
      return next(error, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
    }

    return next(null, {
      statusCode: 200,
      body: JSON.stringify(params),
    });

  });
};
