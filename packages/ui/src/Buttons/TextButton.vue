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
  <button class="border-none rounded-lg p-2 text-lg font-medium cursor-pointer bg-[#739EC9] text-white text-center hover:bg-[#5682B1] w-full" v-bind="$attrs"
  @click="emit('click', $event)">
    {{ label }}
  </button>
</template>