import type { DataListEnvelope } from './dataEnvelope'
import data from '../data/users.json'

export function getAll(): DataListEnvelope<Reply> {
  return {
    isSuccess: true,
    data: data.replies,
    total: data.total
  }
}

export interface Reply {
  id: PropertyKey | undefined
  reviewId: number
  text: string
  author: string
}