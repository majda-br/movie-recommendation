const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    var result = await dynamoDb.query({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': 'movie',
        },
    }).promise();

    var res1 = result.Items;

    var nb_movie = res1.length;

    var liste = [];

    for(i=0 ; i < nb_movie ; i++){
        if(liste.includes(res1[i]["genre"]) == false){
            liste.push(res1[i]["genre"]);
        }
    }

    liste.sort();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(liste),
    }
}
