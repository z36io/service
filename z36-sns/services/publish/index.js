const __basedir = process.cwd();

const _ = require('lodash');
const AWS = require('aws-sdk');
const SNS = new AWS.SNS();
const request = require(__basedir + '/services/request');

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
    request({
      table: 'logs',
      id: 'new',
      method: 'post',
      body: {
        transformation: _.get(params, 'NewImage.id'),
        status: _.get(params, 'NewImage.status'),
        meta: _.get(params, 'NewImage.meta')
      }
    });

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(params),
    });

  });
};
