const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  apiVersion: "2012-08-10",
});

exports.handler = async (event, context, callback) => {
  console.log(event);
  const params = {
    Key: {
      Book_id: {
        S: event.Book_id,
      },
    },
    TableName: "KumoTable",
  };
  try {
    await dynamodb.deleteItem(params).promise();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ result: 'success' }),
    });
  } catch (err) {
    console.error("Error: ", err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ result: 'error', message: err.message }),
    });
  }
};