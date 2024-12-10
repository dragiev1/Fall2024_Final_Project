import type { DataListEnvelope } from './dataEnvelope'
import type { Reply } from './replies'
import data from '../data/users.json'

export function getAll(): DataListEnvelope<Review> {
  return {
    isSuccess: true,
    data: data.reviews,
    total: data.total
  }
}

export interface ReviewWithReplies extends Review {
  reviewId: string
  replies: Reply[]
}

export interface Review {
  userId: number
  id: number
  title: string
  text: string
  date: string
  image?: string | null
  replies?: Reply[]
  rating: number
}