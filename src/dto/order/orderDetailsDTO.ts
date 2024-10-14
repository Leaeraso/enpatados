interface orderDetails {
  orderId: number
  productId: number
  quantity: number
  subtotal: number
  name?: string
  Product?: { name: string }
}

export default orderDetails
