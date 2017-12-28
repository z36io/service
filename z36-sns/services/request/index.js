const __basedir = process.cwd();

const request = require('request');

module.exports = (params) => {

  request({
    method: params.method.toUpperCase(),
    uri: `https://${process.env.db_endpoint}/${params.table}/${params.id}`,
    headers: {
      'x-api-key': process.env.db_token
    },
    json: params.body
  }, (error, response) => {
    if (error || response.statusCode != 200) {
      console.log('Request error:');
      console.dir({ error: error, response: response });
    }
  });

};
