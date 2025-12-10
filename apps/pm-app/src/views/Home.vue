<script setup lang="ts">
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { TextButton, IconButton } from "@pm-web/ui";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToLogin = () => {
	router.push("/auth/login");
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center text-black">
    <h1>Home</h1>
    <RouterLink to="/dashboard">Go to Dashboard</RouterLink>

   <TextButton
    label="Login"
    class="mt-4 hover:bg-blue-700 p-6"
    @click="navigateToLogin"
  />
  <IconButton :icon="faCoffee" class="bg-green-600" />
  </div>
</template>