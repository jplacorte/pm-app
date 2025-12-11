<script setup lang="ts">
interface Props {
  visible?: boolean;
}
// 3. Set default values
withDefaults(defineProps<Props>(), {
  visible: false,
});
</script>

<template>
  <div
    v-if="visible"
    class="flex flex-col justify-center items-center h-64 text-gray-400"
  >
    <p class="text-5xl font-['Pacifico',cursive] font-bold text-[#FFE8DB]">
      No Products Found
    </p>
  </div>
</template>
