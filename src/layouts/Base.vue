<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <v-btn variant="outlined" class="mx-2"
      ><router-link
        :to="{
          name: 'Home',
        }"
        class="text-decoration-none text-white"
        >Home</router-link
      ></v-btn
    >
    <v-btn variant="outlined" @click="onLogout">Logout</v-btn>
  </v-app-bar>
  <v-layout v-if="ready">
    <v-navigation-drawer v-model="drawer" temporary class="pt-16">
      <v-list density="compact" nav class="d-flex flex-column">
        <template v-if="store.cities">
          <template v-for="city in store.cities" :key="city.id">
            <router-link
              :to="{
                name: 'Weather',
                params: { id: city.id },
                query: { lat: city.lat, long: city.long },
              }"
              class="w-100 h-50 d-flex justify-center align-center text-decoration-none text-white bg-grey-darken-2 pa-4 my-2"
              >{{ city.name }}</router-link
            >
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="h-100" style="margin-top: 64px">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { logout } from "@/services/api/auth";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";

const drawer = ref(false);
const ready = ref(false);
const store = useUserStore();
const router = useRouter();

store.addUserDetailsToStore();

onMounted(async () => {
  await store.addUserDetailsToStore();
  ready.value = true;
});

const onLogout = async () => {
  try {
    const response = await logout();

    if (response) await router.push({ path: "login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
