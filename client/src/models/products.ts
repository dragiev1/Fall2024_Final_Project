import data from '../data/products.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<Product> {
  return {
    data: data.items,
    total: data.total
  }
}

interface Review {
  Rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  tags: string[]
  brand?: string
  weight: number
  dimensions: {
    width: number
    height: number
    length: number
  }
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail: string
}
