export interface DataEnvelope<T> {
  data: T
  message?: string
  isSuccess: boolean
  metadata?: any
}

export interface DataListEnvelope<T> extends DataEnvelope<T[]> {
  data: T[]
  total: number
  error?: string
}
