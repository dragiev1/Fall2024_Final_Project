import type { DataListEnvelope, DataEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAllProducts() {
  return await api<DataListEnvelope<Product>>('products')
}

export async function getProductByID(id: number) {
  return api<DataEnvelope<Product>>(`product/${id}`)
}

export function createProduct(product: Product) {
  const dataEnvelope: DataEnvelope<Product> = {
    data: product,
    isSuccess: false
  }
  return api<DataEnvelope<Product>>('products', dataEnvelope)
}

export function updateProduct(product: Product) {
  const dataEnvelope: DataEnvelope<Product> = {
    data: product,
    isSuccess: false
  }
  return api<DataEnvelope<Product>>(`product/${product.id}`, dataEnvelope, 'PATCH')
}

export function removeProduct(id: number) {
  return api<DataEnvelope<Product>>(`products/${id}`, undefined, 'DELETE')
}

export interface Product {
  id: number
  category: string
  images: string
}
