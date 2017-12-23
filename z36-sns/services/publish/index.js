const __basedir = process.cwd();

const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

module.exports = (params, callback) => {

  let msg = {
    Message: JSON.stringify({
      default: JSON.stringify(params.NewImage)
    }),
    MessageStructure: 'json',
    TopicArn: params.TopicArn
  };

  SNS.publish(msg, (error) => {
    if (error) {
      return callback({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    }

    console.log(`Published: ${params.NewImage.id.S} , to: ${params.TopicArn}`);

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(params),
    });

  });
};
