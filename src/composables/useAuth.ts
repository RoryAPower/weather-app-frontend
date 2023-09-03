import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { login, logout } from '@/services/api/auth'
import { reactive } from 'vue'

export function useAuth() {
  const store = useUserStore()
  const router = useRouter()
  const credentials = reactive({ email: '', password: '' })

  const onLogout = async () => {
    try {
      const response = await logout()

      if (response?.status === 204) {
        store.isUserLoggedIn = false
        store.user = null
        await router.push({ path: 'login' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onLogin = async () => {
    try {
      const response = await login({
        email: credentials.email,
        password: credentials.password
      })

      if (response?.status === 200) {
        const store = useUserStore()
        store.isUserLoggedIn = true
        await router.push({ path: '/home' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    onLogout,
    onLogin,
    credentials
  }
}
