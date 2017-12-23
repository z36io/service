const __basedir = process.cwd();

// TODO: map topics
const TOPICS = {
    '0': process.env.topic_created
};

const EVENTS = {
    INSERT: 'INSERT',
    MODIFY: 'MODIFY',
    REMOVE: 'REMOVE'
};

const _ = require('lodash');

module.exports = (params, callback) => {

    let eventName = _.get(params.record, 'eventName');
    let OldImage, NewImage;

    switch (eventName) {
        case EVENTS.INSERT:
            OldImage = _.get(params.record, 'dynamodb.OldImage', { status: { N: -1 } });
            NewImage = _.get(params.record, 'dynamodb.NewImage');
            break;
        case EVENTS.MODIFY:
            OldImage = _.get(params.record, 'dynamodb.OldImage');
            NewImage = _.get(params.record, 'dynamodb.NewImage');
            break;
    }

    if (OldImage && NewImage) {
        let newCode = _.get(NewImage, 'status.N');
        let oldCode = _.get(OldImage, 'status.N');

        if (oldCode && newCode && newCode !== oldCode) {
            let topicARN = TOPICS[newCode.toString()];
            if (topicARN) {
                return callback(null, {
                    NewImage: NewImage,
                    TopicArn: topicARN
                });
            }
        }
    }

    return callback(null, {});

};
