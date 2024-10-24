import { ref, onMounted } from 'vue'
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
  }

  const login = () => {
    isLoggedIn.value = true
  }

  return { isLoggedIn, logout, login }
}
