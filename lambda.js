var AWS = require("aws-sdk");
var table = "ashellunts-website";
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    let request = JSON.parse(event.body);

    let page = request["page"];
    let views = await add_a_view(page);
    
    let responseBody = {
        "views": views
    };
    const response = {
        statusCode: 200,
        headers: {
            //"Access-Control-Allow-Origin" : "*"
            "Access-Control-Allow-Origin" : "https://ashellunts.github.io"
        },
        body: JSON.stringify(responseBody),
    };

    return response;
};

async function get_views(page) {

    var params = {
         TableName: table,
         Key:{
             "page": page
         }
    };
    
    try {
        const data = await docClient.get(params).promise();
        let views = data["Item"]["views"];
        return views;
    } catch (err) {
        console.log("ERROR READING ITEM", err);
        return 0; //this is returned when item does not exist
    }
}

async function add_a_view(page) {

    let views = await get_views(page);
    let new_views = views+1;
    var params = {
         TableName: table,
         Item:{
             "page": page,
             "views": new_views
         }
    };
    
    try {
        const data = await docClient.put(params).promise();
        return new_views;
    } catch (err) {
        console.log("ERROR UPDATING ITEM", err);
        return -1;
    }
}