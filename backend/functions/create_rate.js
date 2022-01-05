const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    var data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    var uuid = data.user;
    uuid = decodeURI(uuid);

    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'user',
            uuid: uuid,
        },
    }).promise();

    var info_user = result.Item;

    if (!info_user) {
        return {
           statusCode: 404,
           body: 'Not found'
        }
     }
    
    var test = Object.keys(info_user);

    if(test.includes("score")){
        var rate = info_user.score;

    var movie = data.title;
    movie = decodeURI(movie);

    var movie_rate = data.score;

    rate[movie] = movie_rate ;

    }else{
        var movie = data.title;
        var movie = decodeURI(movie);
    
        var rate = {};
        var score = data.score;
        rate[movie] = score;
    }

    const item = {
        type: 'user',
        uuid: uuid,
        score: rate,
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(item),
    }
}

