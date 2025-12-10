<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

defineOptions({
  inheritAttrs: false,
});

interface Props {
  icon: IconDefinition | object;
}

defineProps<Props>();

const emit = defineEmits<(e: "click", event: MouseEvent) => void>();
</script>

<template>
  <button
    class="rounded font-bold transition-colors flex items-center justify-center cursor-pointer"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>