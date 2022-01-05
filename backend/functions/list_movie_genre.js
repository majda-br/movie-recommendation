const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    var genre = event.pathParameters.id;
    genre = decodeURI(genre);

    const result = await dynamoDb.query({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': 'movie',
        },
    }).promise();
    const res1 = result.Items;

    var nb_movie = res1.length;

    var list = [];

    for(i=0 ; i<nb_movie ; i++){
        if(res1[i]["genre"] == genre ){
            list.push(res1[i]["uuid"]);
        }
      }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(list.sort()),
    }

}