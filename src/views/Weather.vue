<template>
  <div class="h-screen w-100 flex-column d-flex justify-center align-center">
    <v-overlay v-model="overlay"></v-overlay>

    <v-card variant="outlined" v-if="weatherData" class="w-100">
      <v-card-title class="font-weight-bold text-uppercase text-h3 my-4">{{
        weatherData.city
      }}</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">Temp</th>
              <th class="text-left">Feels like</th>
              <th class="text-left">Temp Min</th>
              <th class="text-left">Temp Max</th>
              <th class="text-left">Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(weatherList, index) in weatherData.weather" :key="index">
              <td>
                <img :src="getIcon(weatherList.icon)" alt="weather icon" />
              </td>
              <td>{{ weatherList.temp }}</td>
              <td>{{ weatherList.feelsLike }}</td>
              <td>{{ weatherList.tempMin }}</td>
              <td>{{ weatherList.tempMax }}</td>
              <td>{{ weatherList.humidity }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useWeather } from '@/composables/useWeather'

const { overlay, weatherData, getIcon } = useWeather()
</script>

<style scoped></style>
