<script setup lang="ts">
interface Props {
  onClick: () => void;
}

defineProps<Props>();
</script>
<template>
  <div
    v-on:click="onClick"
    class="w-full max-h-fit max-w-sm bg-[#FFE8DB] rounded-lg shadow-md flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer"
  >
    <slot />
  </div>
</template>
