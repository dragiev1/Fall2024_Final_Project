import type { DataListEnvelope, DataEnvelope } from './dataEnvelope'
import { api } from './myFetch'
import type { Reply } from './replies'

export async function getAllReviews() {
  return await api<DataListEnvelope<Review>>('reviews')
}

export async function getReviewByID(id: number) {
  return api<DataEnvelope<Review>>(`review/${id}`)
}

export function createReview(review: Review) {
  const dataEnvelope: DataEnvelope<Review> = {
    data: review,
    isSuccess: false
  }
  return api<DataEnvelope<Review>>('reviews', dataEnvelope)
}

export function updateReview(review: Review) {
  const dataEnvelope: DataEnvelope<Review> = {
    data: review,
    isSuccess: false
  }
  return api<DataEnvelope<Review>>(`review/${review.id}`, dataEnvelope, 'PATCH')
}

export function removeReview(id: number) {
  return api<DataEnvelope<Review>>(`reviews/${id}`, undefined, 'DELETE')
}

export interface ReviewWithReplies extends Review {
  reviewId: string
  replies: Reply[]
}

export interface Review {
  userId: number
  id?: number
  title: string
  text: string
  date?: string
  image?: string | null
  replies?: Reply[]
  rating: number
}
