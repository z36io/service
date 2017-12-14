const __basedir = process.cwd();

const async = require('async');
let response = require(__basedir + '/services/response');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    next => response({
      __dirname: __dirname,
      event: event,
      context: context
    }, next)
  ], callback);

};
