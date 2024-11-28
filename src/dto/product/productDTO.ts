interface product {
  id?: number
  name: string
  description: string
  price: number
  stock?: number
  images?: string[]
  categoryId: number
  subcategoryId?: number
}

export default product
