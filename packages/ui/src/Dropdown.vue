<script setup lang="ts">
import { computed } from "vue";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label?: string;
  modelValue: string | number;
  options: readonly (string | Option)[] | (string | Option)[];
  placeholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

// Helper to handle both string arrays and object arrays
const normalizedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === "object") return opt;
    return { label: opt, value: opt };
  });
});
</script>

<template>
  <div class="flex flex-col w-full space-y-1">
    <label v-if="label" class="text-blue-950 font-medium text-start">
      {{ label }}
    </label>

    <div class="relative">
      <select
        :value="modelValue"
        @change="
          emit('update:modelValue', ($event.target as HTMLSelectElement).value)
        "
        class="appearance-none text-[#5682B1] font-medium text-lg p-2 rounded-lg border-2 border-[#739EC9] bg-[#FFE8DB] w-full focus:outline-none focus:border-[#5682B1] cursor-pointer"
        :class="{ 'text-opacity-70': !modelValue }"
      >
        <option value="" disabled selected>
          {{ placeholder || "Select an option" }}
        </option>
        <option
          v-for="opt in normalizedOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5682B1]"
      >
        <svg
          class="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
