import type { DataListEnvelope, DataEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return await api<DataListEnvelope<Product>>('products')
}

export async function getByID(id: number) {
  return api<DataEnvelope<Product>>(`product/${id}`)
}

export function create(product: Product) {
  return api<DataEnvelope<Product>>('products', String(product))
}

export function update(product: Product) {
  return api<DataEnvelope<Product>>(`product/${product.id}`, String(product), 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Product>>(`products/${id}`, undefined, 'DELETE')
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  minimumOrderQuantity: number
  images: string[]
}
