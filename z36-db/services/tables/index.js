const __basedir = process.cwd();

const async = require('async');
const _ = require('lodash');
const uuidv1 = require('uuid/v1');

const DEFAULT_SCHEMA = (body) => {
    const timestamp = Date.now().toString();
    let item = {
        id: _.get(body, 'id', { S: uuidv1() }),
        created: { N: timestamp },
        updated: { N: timestamp },
        meta: _.get(body, 'meta', { M: {} })
    };
    return (map) => _.merge(item, map);
};

const TABLES = {
    logs: {
        name: process.env.table_logs,
        schema: (body) => DEFAULT_SCHEMA(body)({
            transformation: _.get(body, 'transformation'),
            status: _.get(body, 'status')
        })
    },
    transformations: {
        name: process.env.table_transformations,
        schema: (body) => DEFAULT_SCHEMA(body)({
            status: _.get(body, 'status', { N: "0" }),
            from: _.get(body, 'from', { M: {} }),
            to: _.get(body, 'to', { M: {} })
        })
    }
};

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
            let table = TABLES[params.keys.table];
            if (table) {
                params.TableName = table.name;
                params.TableShema = table.schema;
                return next(null, params);
            }
            return next({
                statusCode: 400,
                body: 'Table not valid'
            });
        }
    ], callback);

};
