const __basedir = process.cwd();

const async = require('async');
const dynamodb = require(__basedir + '/services/dynamodb');
const tables = require(__basedir + '/services/tables');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => tables({ event: event, require: ['table', 'id'] }, next),
    (params, next) => next(null, {
      TableName: params.TableName,
      Key: {
        id: {
          S: params.keys.id
        }
      }
    }),
    (params, next) => dynamodb().deleteItem(params, next)
  ], (error, result) => {
    if (error) {
      console.dir(error, { depth: null });
      return callback(null, { statusCode: 200, body: JSON.stringify(error) });
    }
    return callback(null, result);
  });

};
