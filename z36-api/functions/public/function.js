const __basedir = process.cwd();

const async = require('async');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => next(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    }),
    (params, next) => {
      params.body = JSON.stringify({
        config: require(__basedir + '/services/config')
      });
      next(null, params);
    }
  ], (error, result) => {
    callback(null, result);
  });

};
