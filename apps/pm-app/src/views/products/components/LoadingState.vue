<script setup lang="ts">
interface Props {
  loading: boolean;
}
defineProps<Props>();
</script>

<template>
  <div
    v-if="loading"
    class="flex flex-col justify-center items-center h-64 text-gray-500"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5682B1] mb-4"
    ></div>
    <p class="text-xl font-medium">Baking your products...</p>
  </div>
</template>
