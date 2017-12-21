const __basedir = process.cwd();

const TABLES = {
    transformations: process.env.table_transformations
};

const async = require('async');
const _ = require('lodash');

module.exports = (params, callback) => {

    async.waterfall([
        (next) => {
            let body = _.get(params.event, 'body');
            if (body) {
                try {
                    params.body = JSON.parse(body);
                    return next(null, params);
                }
                catch (e) {
                    console.dir(e, { depth: null });
                    return next({
                        statusCode: 400,
                        body: 'Cannot parse body: ' + e.toString()
                    });
                }
            }
            return next({
                statusCode: 400,
                body: 'Body not provided'
            });
        }
    ], callback);

};
