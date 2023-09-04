<template v-if="ready">
  <v-app-bar color="primary">
    <v-spacer />
    <v-btn @click="onLogout" variant="outlined">Logout</v-btn>
  </v-app-bar>
  <v-layout>
    <v-main>
      <v-container class="h-100" style="margin-top: 64px">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useAuth } from '@/composables/useAuth'

const ready = ref(false)
const store = useUserStore()
const { onLogout } = useAuth()

onMounted(async () => {
  await store.addUserDetailsToStore()
  ready.value = true
})
</script>

<style scoped></style>
