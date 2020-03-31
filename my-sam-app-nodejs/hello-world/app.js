
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
var AWS = require("aws-sdk");
let response;

//added a comment


/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world2',
                // location: ret.data.trim()
            })
        }

        var config = {
              "region":"local",
            "endpoint": "http://192.168.1.22:8000"
        };
        
        var dynamodb = new AWS.DynamoDB(config);
       

        var table = "NinjaDudsMainTable";
        var params = {
            TableName: table,
            Key: {
                'PK': {S:"alan.purugganan@gmail.com"},
                'SK': {S:"ORDER#1"}
            }
        };

        var result = await dynamodb.getItem(params).promise()
        console.log(JSON.stringify(result))



    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
