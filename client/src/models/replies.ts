import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAllReplies() {
  return await api<DataListEnvelope<Reply>>('replies')
}

export async function getReplyByID(id: number) {
  return api<DataEnvelope<Reply>>(`reply/${id}`)
}

export function createReply(reply: Reply) {
  const dataEnvelope: DataEnvelope<Reply> = {
    data: reply,
    isSuccess: false
  }
  return api<DataEnvelope<Reply>>('replies', dataEnvelope)
}

export function updateReply(reply: Reply) {
  const dataEnvelope: DataEnvelope<Reply> = {
    data: reply,
    isSuccess: false
  }
  return api<DataEnvelope<Reply>>(`reply/${String(reply.id)}`, dataEnvelope, 'PATCH')
}

export function removeReply(id: number) {
  return api<DataEnvelope<Reply>>(`replies/${id}`, undefined, 'DELETE')
}

export interface Reply {
  id: PropertyKey | undefined
  userId: number
  reviewId: number
  text: string
  author: string
}
