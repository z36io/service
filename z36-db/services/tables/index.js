const __basedir = process.cwd();

const TABLES = {
    transformations: process.env.table_transformations
};

const async = require('async');
const _ = require('lodash');

module.exports = (params, callback) => {

    async.waterfall([
        (next) => {
            let keys = {};
            let values = params.require.map((k) => {
                let v = _.get(params.event.pathParameters, k);
                keys[k] = v;
                return v;
            });
            if (!values.some(v => !v)) {
                params.keys = keys;
                return next(null, params);
            }
            return next({
                statusCode: 400,
                body: 'Parameters not valid'
            });
        },
        (params, next) => {
            let TableName = TABLES[params.keys.table];
            if (TableName) {
                params.TableName = TableName;
                return next(null, params);
            }
            return next({
                statusCode: 400,
                body: 'Table not valid'
            });
        }
    ], callback);

};
