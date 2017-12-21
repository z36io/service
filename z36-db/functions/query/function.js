const __basedir = process.cwd();

const async = require('async');
const dynamodb = require(__basedir + '/services/dynamodb');
const tables = require(__basedir + '/services/tables');
const bodyParser = require(__basedir + '/services/body-parser');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => tables({ event: event, require: ['table'] }, next),
    (params, next) => bodyParser(params, next),
    (params, next) => {
      params.body.TableName = params.TableName;
      next(null, params);
    },
    (params, next) => dynamodb().query(params.body, next)
  ], (error, result) => {
    if (error) {
      console.dir(error, { depth: null });
      return callback(null, { statusCode: 200, body: JSON.stringify(error) });
    }
    return callback(null, result);
  });

};
