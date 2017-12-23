const __basedir = process.cwd();

const _ = require('lodash');
const async = require('async');
const uuidv1 = require('uuid/v1');
const dynamodb = require(__basedir + '/services/dynamodb');
const tables = require(__basedir + '/services/tables');
const bodyParser = require(__basedir + '/services/body-parser');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => tables({ event: event, require: ['table'] }, next),
    (params, next) => bodyParser(params, next),
    (params, next) => {
      const timestamp = Date.now().toString();
      next(null, {
        TableName: params.TableName,
        Item: {
          id: { S: uuidv1() },
          created: { N: timestamp },
          updated: { N: timestamp },
          status: { N: "0" },
          from: _.get(params, 'body.from', { M: {} }),
          to: _.get(params, 'body.to', { M: {} }),
          meta: _.get(params, 'body.meta', { M: {} })
        }
      });
    },
    (params, next) => dynamodb().putItem(params, next)
  ], (error, result) => {
    if (error) {
      console.dir(error, { depth: null });
      return callback(null, { statusCode: 200, body: JSON.stringify(error) });
    }
    return callback(null, result);
  });

};
