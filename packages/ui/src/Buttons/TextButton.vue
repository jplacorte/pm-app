<script setup lang="ts">
interface Props {
  label: string
  className?: string
  onClick?: () => void
}

const { label, className, onClick } = defineProps<Props>()
</script>

<template>
  <button
    :class="className"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>