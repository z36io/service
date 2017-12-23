const __basedir = process.cwd();

const _ = require('lodash');
const async = require('async');
let topics = require(__basedir + '/services/topics');
let publish = require(__basedir + '/services/publish');

module.exports.handler = (event, context, callback) => {

  async.parallel(_.get(event, 'Records', [])
    .map((record) => (call) => {
      async.waterfall([
        (next) => topics({ record: record }, next),
        (topic, next) => {
          if (!_.isEmpty(topic)) {
            return publish(topic, next);
          }
          return next(null);
        }
      ], (error, result) => {
        if (error) {
          // TODO: set error for transformation state
          console.dir(error, { depth: null });
          return call(null, JSON.stringify(error));
        }
        return call(null, result);
      });
    }), (error, results) => {
      callback(null, results);
    });

};
