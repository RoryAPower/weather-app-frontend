<template>
  <v-container fluid class="fill-height py-10 d-flex align-start justify-center">
    <v-overlay v-model="overlay"></v-overlay>
    <div class="px-3 px-sm-5 pb-3 pb-sm-5 w-100" style="max-width: 500px">
      <template v-if="store.cities">
        <h2 class="text-uppercase py-8">My cities</h2>
        <template v-for="city in store.cities" :key="city.id">
          <v-chip class="bg-grey-darken-2 pa-4 ma-2">
            <router-link
              class="text-decoration-none text-white"
              :to="{
                name: 'Weather',
                params: { id: city.id },
                query: { lat: city.lat, long: city.long }
              }"
              >{{ city.name }}</router-link
            >
          </v-chip>
        </template>
      </template>
      <h2 class="text-uppercase py-8">Add City</h2>
      <v-form fast-fail @submit.prevent="onSubmit">
        <v-text-field label="City" required v-model="city"></v-text-field>
        <v-btn type="submit" block class="mt-2" color="primary">Search</v-btn>
        <div v-if="noResultsFound" class="text-uppercase text-red-darken-4 py-4">
          No results found
        </div>
      </v-form>
      <template v-if="cityList.length">
        <v-list>
          <v-list-item
            v-for="(city, index) in cityList"
            :key="index"
            :title="city.name"
            class="bg-grey-darken-2 pa-4 ma-2"
            style="cursor: pointer"
            @click="onCityCreate(city)"
          >
            <v-list-item-subtitle class="d-flex justify-space-between"
              ><span>{{ city?.country }}</span
              ><span>{{ city?.state }}</span></v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </template>
    </div>
  </v-container>
  <div class="d-flex align-center justify-center w-100 h-100"></div>
</template>

<script lang="ts" setup>
import { useCity } from '@/composables/useCity'

const { city, cityList, overlay, noResultsFound, onCityCreate, onSubmit, store } = useCity()
</script>
