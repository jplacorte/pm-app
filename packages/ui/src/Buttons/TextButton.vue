<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
});

interface Props {
	label: string;
}

defineProps<Props>();

const emit = defineEmits<(e: "click", event: MouseEvent) => void>();
</script>

<template>
  <button class="border-2 rounded-lg p-2 text-2xl font-medium cursor-pointer bg-white text-blue-950 text-center hover:bg-blue-700" v-bind="$attrs"
  @click="emit('click', $event)">
    {{ label }}
  </button>
</template>