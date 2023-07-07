import {
  formatJSONResponse,
  type ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway"
import { middyfy } from "@libs/lambda"
import * as AWS from "aws-sdk"
import schema from "./schema"

// local config for DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
})

export const createOrder: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  // Check if an order with the provided idempotencyKey already exists
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      idempotencyKey: event.body.idempotencyKey,
    },
  }
  const existingOrder = await dynamoDb.get(params).promise()

  if (existingOrder.Item) {
    return formatJSONResponse(409, {
      orderId: existingOrder.Item.orderId,
      message: "Order already exists",
    })
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

  return formatJSONResponse(201, {
    orderId,
    message: "Order created",
  })
}

export const main = middyfy(createOrder)
