const __basedir = process.cwd();

const pug = require('pug');
const _ = require('lodash');
const i18n = require('../i18n');

module.exports = (params, next) => {

    const l = _.get(params.event, 'queryStringParameters.l') || 'en';
    const html = pug.renderFile(params.__dirname + '/template.pug', {
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
