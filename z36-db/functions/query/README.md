POST /:table HTTP/1.1
Host: db.z36.io
Cache-Control: no-cache

{
  "ExpressionAttributeValues": {
   ":id": {
     "S": "1"
    }
  },
  "KeyConditionExpression": "id = :id"
}

DOCS: [DynamoDB query](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property)
