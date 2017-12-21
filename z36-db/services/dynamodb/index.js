const __basedir = process.cwd();

const _ = require('lodash');
const async = require('async');
const AWS = require('aws-sdk');

module.exports = (config) => {

    const DynamoDB = new AWS.DynamoDB(config);

    let DynamoDBModule = {
        DynamoDB: DynamoDB
    };

    DynamoDBModule.validate = (params, callback) => {
        if (params.error) {
            return callback({
                statusCode: 500,
                body: JSON.stringify(params.error)
            });
        }
        if (!params.Item) {
            return callback({
                statusCode: 404,
                body: 'Not found'
            });
        }
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        });
    };

    DynamoDBModule.putItem = (params, callback) => {
        async.waterfall([
            (next) => DynamoDB.putItem(params, next)
        ], (error, result) => {
            DynamoDBModule.validate({
                error: error,
                Item: params.Item
            }, callback);
        });
    };

    DynamoDBModule.getItem = (params, callback) => {
        async.waterfall([
            (next) => DynamoDB.getItem(params, next)
        ], (error, result) => {
            DynamoDBModule.validate({
                error: error,
                Item: _.get(result, 'Item')
            }, callback);
        });
    };

    DynamoDBModule.updateItem = (params, callback) => {
        async.waterfall([
            (next) => DynamoDB.updateItem(params, next)
        ], (error, result) => {
            DynamoDBModule.validate({
                error: error,
                Item: _.get(result, 'Attributes')
            }, callback);
        });
    };

    DynamoDBModule.deleteItem = (params, callback) => {
        async.waterfall([
            (next) => DynamoDB.deleteItem(params, next)
        ], (error, result) => {
            DynamoDBModule.validate({
                error: error,
                Item: params.Key
            }, callback);
        });
    };

    DynamoDBModule.query = (params, callback) => {
        async.waterfall([
            (next) => DynamoDB.query(params, next)
        ], (error, result) => {
            DynamoDBModule.validate({
                error: error,
                Item: result
            }, callback);
        });
    };

    return DynamoDBModule;

};
