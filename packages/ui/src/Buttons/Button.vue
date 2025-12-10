<script setup lang="ts">
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { VueElement } from 'vue';


  defineOptions({
	inheritAttrs: false,
});

interface Props {
	children: VueElement | string | IconDefinition | object;
}

defineProps<Props>();

const emit = defineEmits<(e: "click", event: MouseEvent) => void>();
</script>

<template>
  <button class="border-2 rounded-xl  p-2 text-sm font-medium cursor-pointer transition-colors" v-bind="$attrs"
  @click="emit('click', $event)">
    {{ children }}
  </button>
</template>