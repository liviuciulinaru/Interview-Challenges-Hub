import type { AWS } from "@serverless/typescript"

import createOrder from "@functions/createOrder"
import hello from "@functions/hello"

const serverlessConfiguration: AWS = {
  service: "order-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "us-east-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { hello, createOrder },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      stages: ["dev"], // Specify the stages for which to start DynamoDB Local
      start: {
        port: 8000, // Specify the port for DynamoDB Local
        inMemory: true, // Enable in-memory storage
        migrate: true, // Automatically create the tables
      },
      migration: {
        dir: "offline",
      },
    },
  },
  resources: {
    Resources: {
      OrdersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Orders",
          AttributeDefinitions: [
            {
              AttributeName: "idempotencyKey",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "idempotencyKey",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
}

module.exports = serverlessConfiguration
