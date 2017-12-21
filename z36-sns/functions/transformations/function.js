const __basedir = process.cwd();

const async = require('async');
let topics = require(__basedir + '/services/topics');
let publish = require(__basedir + '/services/publish');

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => topics(event, next),
    (topic, next) => {
      if (topic) {
        return publish(topic, next);
      }
      return next(null);
    }
  ], (error, result) => {
    if (error) {
      console.dir(event, { depth: null });
      return callback(JSON.stringify(error), result);
    }
    return callback(null, result);
  });

};
