const __basedir = process.cwd();

let pug = require('pug');
let _ = require('lodash');
let i18n = require('../i18n');

module.exports = (params, next) => {

    let l = _.get(params.event, 'queryStringParameters.l') || 'en';
    let html = pug.renderFile(params.__dirname + '/template.pug', {
        basedir: __basedir,
        i18n: i18n(l)
    });
    let response = {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: html
    };

    next(null, response);

};
