import type { DataListEnvelope } from './dataEnvelope'
import { rest } from './myFetch'

export async function getAll() {
  return await rest<DataListEnvelope<Product>>('http://localhost:3000/api/v1/products')
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  tags?: string[]
  brand?: string
  weight?: number
  dimensions?: {
    width: number
    height: number
    length: number
  }
  returnPolicy?: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail?: string
}
