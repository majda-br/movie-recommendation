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
    var info_user = res1[n];

    var test = Object.keys(info_user);

    if(test.includes("score") == true ){

        const keys = Object.keys(info_user["score"]); // liste film noté

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

        const all_movie = result_movie.Items;

        const nb_movie = all_movie.length;

        var liste = []; // liste film non noté

        var liste_genre = []; //liste genre déja vu

        for(let i=0; i < nb_movie ; i++){
            if(keys.includes(all_movie[i]["uuid"]) == false){
                liste.push(all_movie[i]['uuid']);
            }else{
                liste_genre.push(all_movie[i]["genre"]);
            }
        }

        var nb_film_vu = liste_genre.length ;

        var dict_genre = {} ;
        
        var keys_genre = Object.keys(dict_genre);

        for(let i=0; i < nb_film_vu ; i++){
            keys_genre = Object.keys(dict_genre)
            if(keys_genre.includes(liste_genre[i]) == false){
                dict_genre[liste_genre[i]] = 1 ;
            }else{
                dict_genre[liste_genre[i]] = dict_genre[liste_genre[i]] + 1 ;
            }
        }

        var nb_genre_vu = dict_genre.length ;
        keys_genre = Object.keys(dict_genre);
        var max = dict_genre[0] ;
        var id_genre_favori = 0 ;
        var genre_favori = keys_genre[0];
        for (let i=1; i < nb_genre_vu ; i++){
            if(keys_genre[i] > max){
                max = dict_genre[i];
                id_genre_favori = i;
                genre_favori = keys_genre[i];
            }
        }

        var film_reco = [];

        for(let i=0; i < nb_movie ; i++){
            if(keys.includes(all_movie[i]["uuid"]) == false){
                if(all_movie[i]["genre"] == genre_favori){
                    film_reco.push(all_movie[i]["uuid"]);
                }
            }
        }
    }else{
        var film_reco = [];
    }
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(film_reco),
    }

}