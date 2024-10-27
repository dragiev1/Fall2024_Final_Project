import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
export function useAuth() {
  onMounted(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      isLoggedIn.value = true
    }
  })

  const logout = () => {
    localStorage.removeItem('userToken')
    isLoggedIn.value = false
    router.push('/')
  }

  const login = () => {
    isLoggedIn.value = true
  }

  return { isLoggedIn, logout, login }
}
