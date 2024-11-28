interface product {
  id?: number
  name: string
  description: string
  price: number
  stock?: number
  images?: string[]
  categoryId: number
}

export default product
