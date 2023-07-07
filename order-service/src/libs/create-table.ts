import * as AWS from "aws-sdk"

const dynamoDb = new AWS.DynamoDB({
  region: "localhost",
  endpoint: "http://localhost:8000",
})

async function createTable() {
  const tableName = "Orders"
  await dynamoDb
    .deleteTable({
      TableName: tableName,
    })
    .promise()

  const params = {
    TableName: tableName,
    KeySchema: [{ AttributeName: "idempotencyKey", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "idempotencyKey", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  }

  try {
    await dynamoDb.createTable(params).promise()
    console.log("Table created successfully")
  } catch (error) {
    console.error("Error creating table:", error)
  }
}

// Call the createTable function to create the DynamoDB table
createTable()
