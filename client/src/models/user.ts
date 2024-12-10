import type { DataListEnvelope } from './dataEnvelope'
import type { Review } from './reviews'
import data from '../data/users.json'

export function getAll(): DataListEnvelope<User> {
  return {
    isSuccess: true,
    data: data.users,
    total: data.total
  }
}

export interface User {
  id: number
  email: string
  password: string
  name: string
  telephone: string
  profilePicture: string
  reviews?: Review[]
  numOfReviews: number
}
