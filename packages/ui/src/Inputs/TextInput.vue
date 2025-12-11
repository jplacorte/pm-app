<script setup lang="ts">
// 1. Accept 'modelValue' (standard for Vue v-model)
interface Props {
  label?: string;
  modelValue?: string;
}

defineOptions({
  inheritAttrs: false,
});

defineProps<Props>();

// 2. Define the emit event to update the parent
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// 3. Helper to handle input events
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

    <input
      type="text"
      v-bind="$attrs"
      :value="modelValue"
      @input="handleInput"
      class="text-[#5682B1] font-medium placeholder:text-[#739EC9] placeholder:font-normal text-lg p-2 rounded-lg border-2 border-[#739EC9] bg-[#FFE8DB] w-full focus:outline-none focus:border-[#5682B1] active:border-[#5682B1]"
    />
  </div>
</template>
