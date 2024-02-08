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

// Define the maximum number of requests allowed per minute
const RATE_LIMIT = 100
// Define the time window in milliseconds (1 minute)
const TIME_WINDOW = 60 * 1000

// Create an object to store the request counts
const requestCounts: { [ip: string]: number } = {}

const createOrder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const tableName = process.env.TABLE_NAME

  const ip = "127.0.0.1" //event.requestContext.identity.sourceIp
  const currentTime = Date.now()

  // Check if the IP has exceeded the rate limit
  if (requestCounts[ip] && requestCounts[ip] >= RATE_LIMIT) {
    const resetTime = requestCounts[ip] + TIME_WINDOW
    const secondsLeft = Math.ceil((resetTime - currentTime) / 1000)

    return formatJSONResponse(429, {
      message: "Too Many Requests",
      retryAfter: secondsLeft,
    })
  }

  try {
    // Check if an order with the provided idempotencyKey already exists
    const params = {
      TableName: tableName,
      Key: {
        idempotencyKey: event.body.idempotencyKey,
      },
    }
    const existingOrder = await dynamoDb.get(params).promise()

    if (existingOrder.Item) {
      // Order already exists, return 409 Conflict status
      return formatJSONResponse(409, {
        orderId: existingOrder.Item.orderId,
        message: "Order already exists",
      })
    }

    // If order does not exist, create a new order
    const orderId = "order-" + currentTime // Generate a unique orderId
    const newOrder = {
      orderId,
      userId: event.body.userId,
      productId: event.body.productId,
      quantity: event.body.quantity,
      idempotencyKey: event.body.idempotencyKey,
    }

    await dynamoDb.put({ TableName: tableName, Item: newOrder }).promise()

    return formatJSONResponse(201, {
      orderId,
      message: "Order created",
    })
  } catch (error) {
    // Handle different types of errors and return appropriate HTTP status codes
    if (error.code === "ConditionalCheckFailedException") {
      // DynamoDB conditional check failed, return 412 Precondition Failed status
      return formatJSONResponse(412, {
        message: "Precondition failed",
      })
    } else {
      // Other types of errors, return 500 Internal Server Error status
      return formatJSONResponse(500, {
        message: "Internal Server Error",
      })
    }
  }
}

export const main = middyfy(createOrder)
