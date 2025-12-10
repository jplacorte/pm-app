<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const navigateToLogin = () => {
  router.push('/auth/login')
}
</script>

<template>
  <div >
    <h1>Home</h1>
    <RouterLink to="/dashboard">Go to Dashboard</RouterLink>

    <button @click="navigateToLogin">Login</button>
  </div>
</template>