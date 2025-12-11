<script setup lang="ts">
interface Props {
  message?: string;
  isCard?: boolean; // Prop to toggle between Auth Card style and Page style
}

withDefaults(defineProps<Props>(), {
  message: "Loading...",
  isCard: false,
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center transition-all duration-300"
    :class="[
      isCard
        ? 'bg-[#FFE8DB] p-8 rounded-lg w-96 shadow-xl border-4 border-[#739EC9] min-h-[400px]'
        : 'h-full w-full py-20 text-[#FFE8DB]',
    ]"
  >
    <div
      class="animate-spin rounded-full border-b-4 mb-6"
      :class="
        isCard
          ? 'h-20 w-20 border-[#5682B1]'
          : 'text-3xl text-[#FFE8DB h-16 w-16'
      "
    ></div>
    <p
      class="font-['Pacifico',cursive] animate-pulse text-center"
      :class="isCard ? 'text-2xl text-[#5682B1]' : 'text-3xl text-[#FFE8DB'"
    >
      {{ message }}
    </p>
  </div>
</template>
