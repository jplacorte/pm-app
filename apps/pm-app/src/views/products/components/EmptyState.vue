<script setup lang="ts">
interface Props {
  products: number;
}

defineProps<Props>();
</script>

<template>
  <div
    v-if="products === 0"
    class="flex flex-col justify-center items-center h-64 text-gray-400"
  >
    <p class="text-5xl font-['Pacifico',cursive] font-bold text-[#FFE8DB]">
      No Products Found
    </p>
  </div>
</template>
