<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();

const showNavbar = computed(() => {

  const hiddenRoutes = ['/auth/login', '/auth/register'];

  return !hiddenRoutes.includes(route.path);
});
</script>

<template>
  <div class="h-screen w-screen text-white">
    <Navbar v-if="showNavbar"/>
    <RouterView />
  </div>
</template>
