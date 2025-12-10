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
  <div class="flex flex-col w-full space-y-1">

    <label
      v-if="label"
      class="text-blue-950 font-medium text-start"
    >
      {{ label }}
    </label>

    <input
      type="text"
      v-bind="$attrs"
      class="text-[#5682B1] font-medium placeholder:text-gray-500 placeholder:font-light text-lg p-2 rounded-lg border-2 border-[#739EC9] bg-[#FFE8DB] w-full focus:outline-none focus:border-[#5682B1] active:border-[#5682B1]"
    >
  </div>
</template>