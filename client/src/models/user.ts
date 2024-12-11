import type { DataListEnvelope } from './dataEnvelope'
import type { Review } from './reviews'
import data from '../data/users.json'
import { ref } from 'vue'
import { loadScript, rest } from './myFetch'

const session = ref({
  user: null as Partial<User> | null,
  token: '',
  message: '',
  isLoading: false
})

export const refSession = () => session

export function getAllUsers(): DataListEnvelope<User> {
  return {
    isSuccess: true,
    data: data.users,
    total: data.total
  }
}

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
  async login(email: string, password: string) {},
  async logout() {
    session.value.user = null
  },
  async googleLogin() {
    await loadScript('https://accounts.google.com/gsi/client')

    if (!google || !google.accounts || !google.accounts.oauth2) {
      throw new Error('Google API not loaded');
    }

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
  }
})

