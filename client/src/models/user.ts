import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import type { Review } from './reviews'
import { ref } from 'vue'
import { api } from './myFetch'

const session = ref({
  user: null as Partial<User> | null,
  token: '',
  message: '',
  isLoading: false
})

export async function getAllUsers() {
  return await api<DataListEnvelope<User>>('users')
}

export async function getByIDUser(id: number) {
  return api<DataEnvelope<User>>(`user/${id}`)
}

export function createUser(user: User) {
  const dataEnvelope: DataEnvelope<User> = {
    data: user,
    isSuccess: false
  }
  return api<DataEnvelope<User>>('users', dataEnvelope)
}

export function updateUser(user: User) {
  const dataEnvelope: DataEnvelope<User> = {
    data: user,
    isSuccess: false
  }
  return api<DataEnvelope<User>>(`user/${user.id}`, dataEnvelope, 'PATCH')
}

export function removeUser(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE')
}

export const refSession = () => session

export interface User {
  id?: number
  email: string
  password: string
  name: string
  telephone: string
  profilePicture: string
  reviews?: Review[]
  numOfReviews: number
}

export const useLogin = () => ({
  async login() {},
  async logout() {
    session.value.user = null
  }
  /*async googleLogin() {
    await loadScript('https://accounts.google.com/gsi/client')

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope:
        'email ' +
        'profile ' +
        'https://www.googleapis.com/auth/contacts.readonly ' +
        'https://www.googleapis.com/auth/photoslibrary.readonly',
      callback: async (response: any) => {
        console.log('response', response)
        if (response.access_token) {
          session.value.token = response.access_token

          const googleUser = await rest<any>(
            'https://www.googleapis.com/oauth2/v1/userinfo',
            undefined,
            'GET',
            {
              Authorization: `Bearer ${response.access_token}`
            }
          )

          console.log(googleUser)
          session.value.user = {
            name: googleUser.given_name,
            email: googleUser.email,
            profilePicture: googleUser.picture,
            telephone: googleUser.telephone
          }

          console.log(session.value.user)
        }
      }
    })

    tokenClient.requestAccessToken({})
  }*/
})
