import type { DataListEnvelope } from './dataEnvelope'
import data from '../data/users.json'

export function getAll(): DataListEnvelope<User> {
  return {
    data: data.users,
    total: data.total
  }
}

export interface Review {
  id: number
  title: string
  text: string
  date: string
  rating: number
}

export interface User {
  id: string
  email: string 
  password: string
  name: string 
  telephone: string 
  profilePicture: string
  reviews: Review[]
  numOfReviews: number
}