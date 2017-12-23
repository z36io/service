const __basedir = process.cwd();

const _ = require('lodash');

module.exports.handler = (event, context, callback) => {

  let Message = _.get(event, 'Records[0].Sns.Message');
  let msg = JSON.parse(Message);

  console.log('Message - ', msg);

};
