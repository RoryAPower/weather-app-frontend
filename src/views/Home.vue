<template>
  <v-container
    fluid
    class="fill-height py-0 d-flex align-center justify-center"
  >
    <v-overlay v-model="overlay"></v-overlay>
    <div class="px-3 px-sm-5 pb-3 pb-sm-5 w-100" style="max-width: 500px">
      <h1 class="text-uppercase py-8">Add City</h1>
      <v-form fast-fail @submit.prevent="onSubmit">
        <v-text-field label="City" required v-model="city"></v-text-field>
        <v-btn type="submit" block class="mt-2" color="primary">Search</v-btn>
        <div
          v-if="noResultsFound"
          class="text-uppercase text-red-darken-4 py-4"
        >
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
            <v-list-item-subtitle
              >{{ city.country }} {{ city.state }}</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </template>
    </div>
  </v-container>
  <div class="d-flex align-center justify-center w-100 h-100"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getCity } from "@/services/api/geoLocation";
import { City } from "@/interfaces/weather";
import { createCity } from "@/services/api/city";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";

const city = ref("");
const cityList = ref([]);
const overlay = ref(false);
const store = useUserStore();
const router = useRouter();
const noResultsFound = ref<boolean>(false);

const onSubmit = async () => {
  overlay.value = true;
  noResultsFound.value = false;

  try {
    const response = await getCity(city.value);

    if (response) {
      const cityData = response.data.data;

      if (cityData.length === 0) noResultsFound.value = true;
      cityList.value = response.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    overlay.value = false;
  }
};

const onCityCreate = async (city: any) => {
  overlay.value = true;

  const cityParams: City = {
    name: city.name,
    country: city.country,
    lat: city.lat,
    long: city.lon,
  };

  try {
    const response = await createCity(cityParams);

    if (response) {
      const cityData = response.data.data;
      await store.addUserDetailsToStore();
      await router.push({
        name: "Weather",
        params: { id: cityData.id },
        query: { lat: cityData.lat, long: cityData.long },
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    overlay.value = false;
  }
};
</script>
