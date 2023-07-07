# Serverless - AWS Node.js Typescript

## Installation/deployment instructions

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

> Docker

### Setup

```bash
yarn
docker-compose up -d # to start the DynamoDB locally
echo -e "TABLE_NAME=Orders" > .env # create env file
yarn run create:table
```

### Test Locally

In order to test the hello function locally, run the following command 2 times:

```bash
yarn sls invoke local --function createOrder --path src/functions/createOrder/mock.json
```

- First time will create the order and return 201 status code with the order id

```json
{
  "statusCode": 201,
  "body": "{\"orderId\":\"order-1688738215733\",\"message\":\"Order created\"}"
}
```

- Second time should return 409 as the order exists and will return the order id from DB

```json
{
  "statusCode": 409,
  "body": "{\"orderId\":\"order-1688738215733\",\"message\":\"Order already exists\"}"
}
```

To reset the table just run again `yarn run create:table`

## The list of possible return values

| Scenario                                           | Status Code | Response Body                                                           |
| -------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| Order already exists                               | 409         | `{"orderId": "<existing order ID>", "message": "Order already exists"}` |
| New order created                                  | 201         | `{"orderId": "<newly created order ID>", "message": "Order created"}`   |
| Conditional check failed during DynamoDB operation | 412         | `{"message": "Precondition failed"}`                                    |
| Unexpected error during function execution         | 500         | `{"message": "Internal Server Error"}`                                  |
