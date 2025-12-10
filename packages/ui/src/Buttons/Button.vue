<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<(e: "click", event: MouseEvent) => void>();
</script>

<template>
  <button
    class="border-2 roundedl-lg text-sm font-medium cursor-pointer transition-colors"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
