export default {
  type: "object",
  properties: {
    userId: { type: "string" },
    productId: { type: "string" },
    quantity: { type: "number" },
    idempotencyKey: { type: "string" },
  },
  required: ["userId", "productId", "quantity", "idempotencyKey"],
} as const
