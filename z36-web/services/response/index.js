const __basedir = process.cwd();

const pug = require('pug');
const _ = require('lodash');
const i18n = require('../i18n');

const response = (params) => _.merge({
    headers: {
        'Content-Type': 'text/html'
    }
}, params);

module.exports = (params, next) => {

    const qs = _.get(params.event, 'queryStringParameters') || {};

    params.optional = params.optional || {};
    params.optional.l = i18n.keys();

    if (params.require && !_.keys(params.require).every((p) => {
            let value = qs[p];
            let isValid = !!value && !!~params.require[p].indexOf(value);
            isValid && (params.require[p] = value);
            return isValid;
        })) {
        return next(null, response({ statusCode: 404, body: 'Not found' }));
    }

    if (params.optional && !_.keys(params.optional).every((p) => {
            let value = qs[p];
            let isValid = !value || !!~params.optional[p].indexOf(value);
            isValid && (params.optional[p] = value);
            return isValid;
        })) {
        return next(null, response({ statusCode: 400, body: 'Not supported' }));
    }

    const l = params.optional.l || 'en';
    let opt = {
        basedir: __basedir,
        qs: qs,
        i18n: i18n(l),
        api: `https://${process.env.api}/`,
        ctrl: params.ctrl || {}
    };
    opt.title = params.title(opt);
    opt.description = params.description(opt);
    //const html = pug.renderFile(params.__dirname + '/template.pug', opt);
    const html = require(params.__dirname + '/template.js')(opt);

    next(null, response({ statusCode: 200, body: html }));

};
