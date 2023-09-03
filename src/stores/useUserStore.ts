import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { User, UserResponse } from '@/interfaces/user'
import { getUserDetails } from '@/services/api/user'
import { City } from '@/interfaces/weather'
import { AxiosResponse } from 'axios'

export const useUserStore = defineStore(
  'user',
  () => {
    const isUserLoggedIn = ref(false)
    const user = ref<User | null>()
    const cities = computed<City[] | []>(() => user.value?.cities || [])
    async function addUserDetailsToStore() {
      try {
        const response: AxiosResponse<UserResponse> = await getUserDetails()

        if (response?.status === 200) {
          user.value = response.data?.data
        }
      } catch (error) {
        console.log(error)
      }
    }

    return { user, cities, isUserLoggedIn, addUserDetailsToStore }
  },
  {
    persist: true
  }
)
