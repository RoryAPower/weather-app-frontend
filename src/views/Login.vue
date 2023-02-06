<template>
  <v-container fluid class="fill-height py-0">
    <v-row class="fill-height">
      <v-col
        md="6"
        class="primary flex-column d-none d-md-flex overlay pa-sm-5 bg-primary"
      >
      </v-col>
      <v-col
        md="6"
        class="flex-column d-flex pa-0 pb-4 fill-height overflow-y-hidden justify-start justify-md-center align-center"
      >
        <div class="px-3 px-sm-5 pb-3 pb-sm-5 w-100" style="max-width: 500px">
          <h1 class="text-uppercase py-8">My weather</h1>
          <v-form fast-fail @submit.prevent="onSubmit">
            <v-text-field
              label="Email"
              required
              v-model="credentials.email"
            ></v-text-field>
            <v-text-field
              label="Password"
              required
              type="password"
              v-model="credentials.password"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2" color="primary"
              >Submit</v-btn
            >
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { login } from "@/services/api/auth";
import router from "@/router";

const credentials = reactive({ email: "", password: "" });
const onSubmit = async () => {
  try {
    const response = await login({
      email: credentials.email,
      password: credentials.password,
    });

    if (response) await router.push({ path: "/home" });
  } catch (error) {
    console.log(error);
  }
};
</script>
