import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway"
import { middyfy } from "@libs/lambda"
import * as AWS from "aws-sdk"
import schema from "./schema"

// const dynamoDb = new AWS.DynamoDB.DocumentClient()
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
})

const createOrder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // Check if an order with the provided idempotencyKey already exists
  const params = {
    TableName: "Orders",
    Key: {
      idempotencyKey: event.body.idempotencyKey,
    },
  }
  const existingOrder = await dynamoDb.get(params).promise()

  if (existingOrder.Item) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        orderId: existingOrder.Item.orderId,
        message: "Order already exists",
      }),
    }
  }

  // If not, create a new order
  const orderId = "order-" + Date.now() // Generate a unique orderId
  const newOrder = {
    orderId,
    userId: event.body.userId,
    productId: event.body.productId,
    quantity: event.body.quantity,
    idempotencyKey: event.body.idempotencyKey,
  }

  await dynamoDb.put({ TableName: "Orders", Item: newOrder }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      orderId,
      message: "Order created",
    }),
  }

  // return formatJSONResponse({
  //   message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
  //   event,
  // })
}

export const main = middyfy(createOrder)
