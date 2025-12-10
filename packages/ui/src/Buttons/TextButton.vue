<script setup lang="ts">
interface Props {
  label: string
  className?: string
  onClick?: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <button
    :class="props.className"
    @click="props.onClick"
  >
    {{ props.label }}
  </button>
</template>