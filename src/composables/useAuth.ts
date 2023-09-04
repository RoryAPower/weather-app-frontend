import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { login, logout } from '@/services/api/auth'
import { reactive, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useAuth() {
  const store = useUserStore()
  const router = useRouter()
  const credentials = reactive({ email: '', password: '' })
  const loginError = ref('')

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  })

  const { handleSubmit, handleReset } = useForm({
    validationSchema
  })

  const email = useField('email', validationSchema)
  const password = useField('password', validationSchema)

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

  const onLogin = handleSubmit(async (values) => {
    loginError.value = ''

    await login({
      email: values.email,
      password: values.password
    })
      .then((response) => {
        if (response?.status === 200) {
          const store = useUserStore()
          store.isUserLoggedIn = true
          router.push({ path: '/home' })
        }

        return response
      })
      .catch(async (error) => {
        if (error?.status === 422) {
          loginError.value = error?.data?.message || 'Something went wrong'
        }

        console.error(error)
      })
  })

  return {
    onLogout,
    credentials,
    loginError,
    email,
    password,
    handleReset,
    onLogin
  }
}
