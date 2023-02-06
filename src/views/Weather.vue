<template>
  <div class="h-screen w-100 flex-column d-flex justify-center align-center">
    <v-overlay v-model="overlay"></v-overlay>

    <v-card variant="outlined" v-if="weatherData" class="w-100">
      <v-card-title class="font-weight-bold text-uppercase text-h3 my-4">{{
        weatherData.city.name
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
            <tr v-for="(weatherList, index) in weatherData.list" :key="index">
              <td>
                <img
                  :src="`http://openweathermap.org/img/wn/${weatherList.weather[0].icon}@2x.png`"
                  alt="weather icon"
                />
              </td>
              <td>{{ weatherList.main.temp }}</td>
              <td>{{ weatherList.main.feels_like }}</td>
              <td>{{ weatherList.main.temp_min }}</td>
              <td>{{ weatherList.main.temp_max }}</td>
              <td>{{ weatherList.main.humidity }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { getWeather } from "@/services/api/weather";
import { useRoute } from "vue-router";
import { Weather } from "@/interfaces/weather";

const ready = ref(false);
const route = useRoute();
const weatherData = ref<Weather>();
const overlay = ref(false);

const loadWeather = async (lat: any, long: any) => {
  overlay.value = true;
  try {
    const response = await getWeather(parseFloat(lat), parseFloat(long));

    if (response) return response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    overlay.value = false;
  }
};

onMounted(async () => {
  weatherData.value = await loadWeather(route.query.lat, route.query.long);
  ready.value = true;
});

watch(
  () => route.params.id,
  async () => {
    weatherData.value = await loadWeather(route.query.lat, route.query.long);
  }
);
</script>

<style scoped></style>
