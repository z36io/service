const __basedir = process.cwd();

module.exports.handler = (event, context, callback) => {
  var response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'sns',
    }),
  };

  callback(null, response);

};
