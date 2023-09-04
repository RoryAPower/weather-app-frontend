<template>
  <v-container fluid class="fill-height pa-0">
    <v-row class="fill-height">
      <v-col md="6" class="primary flex-column d-none d-md-flex overlay pa-0 bg-primary">
        <v-img aspect-ratio="16/9" cover :src="image"></v-img>
      </v-col>
      <v-col
        md="6"
        class="flex-column d-flex pa-0 pb-4 fill-height overflow-y-hidden justify-start justify-md-center align-center"
      >
        <div class="px-3 px-sm-5 pb-3 pb-sm-5 w-100" style="max-width: 500px">
          <h1 class="text-uppercase py-8">My weather</h1>
          <v-form fast-fail @submit.prevent="onLogin">
            <v-text-field
              label="Email"
              required
              v-model="email.value.value"
              :error-messages="email.errorMessage.value as string"
            ></v-text-field>
            <v-text-field
              label="Password"
              required
              type="password"
              v-model="password.value.value"
              :error-messages="password.errorMessage.value as string"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2" color="primary">Submit</v-btn>
            <div v-if="loginError" class="text-red-darken-4 py-4">
              {{ loginError }}
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import image from '@/assets/weather.jpg'

const { onLogin, loginError, email, password } = useAuth()
</script>
