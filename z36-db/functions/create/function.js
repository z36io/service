const __basedir = process.cwd();

const _ = require('lodash');
const async = require('async');
const dynamodb = require(__basedir + '/services/dynamodb');
const tables = require(__basedir + '/services/tables');
const bodyParser = require(__basedir + '/services/body-parser');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => tables({ event: event, require: ['table'] }, next),
    (params, next) => bodyParser(params, next),
    (params, next) => {
      let Item = params.TableShema(params.body);
      if (_.some(Item, _.isEmpty)) {
        return next({
          statusCode: 400,
          body: 'Required properties not provided'
        });
      }
      return next(null, {
        TableName: params.TableName,
        Item: Item
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
