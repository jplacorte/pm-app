<script setup lang="ts">
interface Props {
  label?: string;
  modelValue?: string | number;
  prefix?: string; // New prop for currency symbol
}

defineOptions({
  inheritAttrs: false,
});

defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col w-full space-y-1">
    <label v-if="label" class="text-blue-950 font-medium text-start">
      {{ label }}
    </label>

    <div class="relative w-full">
      <span
        v-if="prefix"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-[#739EC9] font-bold text-lg select-none"
      >
        {{ prefix }}
      </span>

      <input
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        @input="handleInput"
        :class="[
          'text-[#5682B1] font-medium placeholder:text-[#739EC9]/70 placeholder:font-normal text-lg p-2 rounded-lg border-2 border-[#739EC9] bg-[#FFE8DB] w-full focus:outline-none focus:border-[#5682B1] active:border-[#5682B1] transition-colors',
          prefix ? 'pl-8' : '', // Add padding-left if prefix exists so text doesn't overlap
          'no-spinner', // Remove default browser arrows
        ]"
      />
    </div>
  </div>
</template>

<style scoped>
/* CSS to hide the number spinners (up/down arrows) */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner[type="number"] {
  -moz-appearance: textfield; /* Firefox support */
  appearance: textfield;
}
</style>
