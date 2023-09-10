import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Weather, WeatherResponse } from '@/interfaces/weather'
import { getWeather } from '@/services/api/weather'
import { AxiosResponse } from 'axios'

export function useWeather() {
  const route = useRoute()
  const weatherData = ref<Weather>()
  const overlay = ref(false)

  const loadWeather = async (lat: string, long: string) => {
    overlay.value = true

    try {
      const response: AxiosResponse<WeatherResponse> = await getWeather(
        parseFloat(lat),
        parseFloat(long)
      )

      if (response.status === 200) return response.data.data
    } catch (error) {
      console.error(error)
    } finally {
      overlay.value = false
    }
  }

  const getIcon = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }

  onMounted(async () => {
    weatherData.value = await loadWeather(route.query.lat as string, route.query.long as string)
  })

  watch(
    () => route.params.id,
    async () => {
      if (Object.keys(route.query).length) {
        weatherData.value = await loadWeather(route.query.lat as string, route.query.long as string)
      }
    }
  )

  return {
    weatherData,
    overlay,
    getIcon
  }
}
