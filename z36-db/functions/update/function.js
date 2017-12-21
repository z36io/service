const __basedir = process.cwd();

const _ = require('lodash');
const async = require('async');
const dynamodb = require(__basedir + '/services/dynamodb');
const tables = require(__basedir + '/services/tables');
const bodyParser = require(__basedir + '/services/body-parser');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => tables({ event: event, require: ['table', 'id'] }, next),
    (params, next) => bodyParser(params, next),
    (params, next) => {
      let ExpressionAttributeNames = {
        '#updated': 'updated',
      };
      let ExpressionAttributeValues = {
        ':updated': {
          N: Date.now().toString()
        },
      };
      let UpdateExpression = 'SET #updated = :updated';

      _.each(params.body, (value, key) => {
        let keyName = '#' + key.replace(/\./gim, '.#');
        let keyValue = ':' + key.replace(/\./gim, '_');
        key.split('.').map((k) => {
          ExpressionAttributeNames[`#${k}`] = k.toString();
        });
        ExpressionAttributeValues[keyValue] = value;
        UpdateExpression += `, ${keyName} = ${keyValue}`;
      });

      next(null, {
        TableName: params.TableName,
        Key: {
          id: {
            S: params.keys.id
          }
        },
        ReturnValues: 'ALL_NEW',
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues,
        UpdateExpression: UpdateExpression,
      });
    },
    (params, next) => dynamodb().updateItem(params, next)
  ], (error, result) => {
    if (error) {
      console.dir(error, { depth: null });
      return callback(null, { statusCode: 200, body: JSON.stringify(error) });
    }
    return callback(null, result);
  });

};
