const __basedir = process.cwd();

const _ = require('lodash');

// TODO: map topics
const TOPICS = {
    '0': process.env.topic_created
};

module.exports = (event, callback) => {

    let NewImage = _.get(event, 'Records[0].dynamodb.NewImage');
    let OldImage = _.get(event, 'Records[0].dynamodb.OldImage');

    if (OldImage && NewImage) {

        let newCode = _.get(NewImage, 'status.M.code.N');
        let oldCode = _.get(OldImage, 'status.M.code.N');

        if (oldCode && newCode && newCode !== oldCode) {

            let topicARN = TOPICS[newCode.toString()];

            if (topicARN) {
                return callback(null, {
                    Message: JSON.stringify({
                        default: JSON.stringify(NewImage)
                    }),
                    MessageStructure: 'json',
                    TopicArn: topicARN
                });
            }
        }
        return callback(null, false);
    }

    return callback({
        statusCode: 400,
        message: 'No dynamodb data'
    });

};
