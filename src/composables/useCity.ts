import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'
import { City, CitiesResponse, CityResponse } from '@/interfaces/weather'
import { createCity } from '@/services/api/city'
import { getCity } from '@/services/api/geoLocation'
import { AxiosResponse } from 'axios'

export function useCity() {
  const city = ref('')
  const cityList = ref<City[] | []>([])
  const overlay = ref(false)
  const store = useUserStore()
  const router = useRouter()
  const noResultsFound = ref<boolean>(false)

  const onSubmit = async () => {
    overlay.value = true
    noResultsFound.value = false

    try {
      const response: AxiosResponse<CitiesResponse> = await getCity(city.value)

      if (response.status === 200) {
        const cityData = response?.data?.data

        if (cityData.length === 0) noResultsFound.value = true
        cityList.value = cityData
      }
    } catch (error) {
      console.error(error)
    } finally {
      overlay.value = false
    }
  }

  const onCityCreate = async (city: City) => {
    overlay.value = true

    const cityParams: City = {
      name: city.name,
      country: city.country,
      lat: city.lat,
      long: city.long,
      state: city.state
    }

    try {
      const response: AxiosResponse<CityResponse> = await createCity(cityParams)

      if (response?.status === 201) {
        const cityData = response?.data.data
        await store.addUserDetailsToStore()

        await router.push({
          name: 'Weather',
          params: { id: cityData.id },
          query: { lat: cityData.lat, long: cityData.long }
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      overlay.value = false
    }
  }

  return {
    city,
    cityList,
    overlay,
    noResultsFound,
    onCityCreate,
    onSubmit
  }
}
