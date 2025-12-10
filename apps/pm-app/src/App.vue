<script setup lang="ts">
// In most Vue 3 apps, RouterView is globally registered,
// but importing it is safe and makes it explicit for TypeScript.
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="h-screen w-screen bg-slate-900 text-white">
    <RouterView />
  </div>
</template>
