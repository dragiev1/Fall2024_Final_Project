import data from '../data/products.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<Product> {
  return {
    isSuccess: true,
    data: data.items,
    total: data.total
  }
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
