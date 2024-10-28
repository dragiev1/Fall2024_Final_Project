import type { DataListEnvelope } from './dataEnvelope'
import data from '../data/users.json'

export function getAll(): DataListEnvelope<User> {
  return {
    data: data.users,
    total: data.total
  }
}

export interface ReviewWithReplies extends Review {
  userId: string
  replies: Reply[]
}

export interface Reply {
  id: PropertyKey | undefined
  text: string
  author: string
  time: string
}

export interface Review {
  id: number
  title: string
  text: string
  date: string
  image?: string | null
  replies?: Reply[]
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