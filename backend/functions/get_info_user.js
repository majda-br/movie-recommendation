const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    var uuid = event.pathParameters.id;
    uuid = decodeURI(uuid);

    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'user',
            uuid: uuid,
        },
    }).promise();

    if (result.Item) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(result.Item),
        }
    } else {
        return {
            statusCode: 404,
            body: 'Not found'
        }
    }
}
