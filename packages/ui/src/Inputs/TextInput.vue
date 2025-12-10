<script setup lang="ts">
  interface Props {
    label?: string;
  }

  defineOptions({
	  inheritAttrs: false,
  });

  defineProps<Props>();
</script>

<template>
  <div class="flex flex-row items-center w-full">

    <label
      v-if="label"
      class="w-24 text-blue-950 font-medium mr-4 text-right"
    >
      {{ label }}:
    </label>

    <input
      type="text"
      v-bind="$attrs"
      class="text-blue-950 placeholder:text-blue-950 text-xl p-2 rounded-lg border-2 bg-white w-full focus: outline-blue-700"
    />
  </div>
</template>