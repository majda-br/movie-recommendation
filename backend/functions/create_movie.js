const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    var uuid = data.movie;
    uuid = decodeURI(uuid);

    var affiche =  data.affiche;
    var genre = data.genre;
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
    N = res1.length;
    var n = 0;
    for(let i=0; i <N ; i++){
        if(res1[i]["uuid"] == uuid){
            n = 1;
        }
    }   

    if(n == 0){
        const item = {
            type: 'movie',
            uuid: uuid,
            genre: genre,
            affiche: affiche,
        }
    
        await dynamoDb.put({
            TableName: process.env.tableName,
            Item: item,
        }).promise();
    }


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(item),
    }
}
