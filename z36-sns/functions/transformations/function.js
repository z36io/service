const __basedir = process.cwd();

const _ = require('lodash');
const async = require('async');
let topics = require(__basedir + '/services/topics');
let publish = require(__basedir + '/services/publish');
const request = require(__basedir + '/services/request');

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
          console.dir(error, { depth: null });
          const errorStr = JSON.stringify(error);
          request({
            table: 'transformations',
            id: _.get(record, 'dynamodb.NewImage.id.S'),
            method: 'patch',
            body: {
              status: { N: "500" },
              meta: { M: { error: {S: errorStr}} }
            }
          });
          return call(null, errorStr);
        }
        return call(null, result);
      });
    }), (error, results) => {
      callback(null, results);
    });

};
