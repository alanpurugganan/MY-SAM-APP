
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let AWS = require("aws-sdk");
let response;
let dynamodb = new AWS.DynamoDB();

if(process.env.EnvType == 'Local'){
    let config = {
      "region":"local",
      "endpoint": `http://${process.env.LocalIp}:${process.env.LocalDynamoDbPort}`
    };

    dynamodb = new AWS.DynamoDB(config);
}

exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `hello world2 ${process.env.EnvType}`
                // location: ret.data.trim()
            })
        }

        let table = process.env.TableName;
        let params = {
            TableName: table,
            Key: {
                'PK': {S:"alan.purugganan@gmail.com"},
                'SK': {S:"ORDER#1"}
            }
        };

        let result = await dynamodb.getItem(params).promise()
        console.log(JSON.stringify(result))

    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
