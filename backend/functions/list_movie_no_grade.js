const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    var uuid = event.pathParameters.id;
    uuid = decodeURI(uuid);

    const result = await dynamoDb.query({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': 'user',
        },
    }).promise();
    const res1 = result.Items;
    N = res1.length;
    var n = 0;
    for(let i=0; i <N ; i++){
        if(res1[i]["uuid"] == uuid){
            n = i;
        }
    }    
    const info_user = res1[n];

    var test = Object.keys(info_user);
        
    var liste = [];


    if(test.includes("score")){
        var keys = Object.keys(info_user["score"]);

        const result_movie = await dynamoDb.query({
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':type': 'movie',
            },
        }).promise();

        const result_movie1 = result_movie.Items;

        const nb_movie = result_movie1.length;
        
        for(let i=0; i < nb_movie ; i++){
            if(keys.includes(result_movie1[i]["uuid"]) == false){
                liste.push(result_movie1[i]['uuid']);
            }
        }
    }else{
        const result_movie = await dynamoDb.query({
            TableName: process.env.tableName,
            KeyConditionExpression: '#type = :type',
            ExpressionAttributeNames: {
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':type': 'movie',
            },
        }).promise();

        const result_movie1 = result_movie.Items;

        const nb_movie = result_movie1.length;
        
        for(let i=0; i < nb_movie ; i++){
            liste.push(result_movie1[i]['uuid']);
        }

    }


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(liste.sort()),
    }

}