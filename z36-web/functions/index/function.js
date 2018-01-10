const __basedir = process.cwd();

const _ = require("lodash");
const async = require('async');
const URI = require('urijs');
const response = require(__basedir + '/services/response');
const FROM = ['paypal', 'liqpay', 'payoneer'];
const TO = ['btc', 'eth', 'ltc'];

module.exports.handler = (event, context, callback) => {

  async.waterfall([
    (next) => response({
      __dirname: __dirname,
      event: event,
      context: context,
      optional: {
        from: FROM,
        to: TO
      },
      title: (params) => {
        let _pick = _.chain(params.qs).pick(['from', 'to']).pickBy(v => !!v);
        let key = _pick.keys().sort().unshift('title').join('_').value();
        return _.template(params.i18n[key])(_pick.mapValues(v => params.i18n[v]).value());
      },
      description: (params) => {
        //TODO:
        let decription = params.i18n.description;
        return decription;
      },
      ctrl: {
        from: FROM,
        to: TO,
        href: (qs, p) => {
          return '/' + URI().query(_.assign({}, qs, p)).search();
        }
      }
    }, next)
  ], callback);

};
