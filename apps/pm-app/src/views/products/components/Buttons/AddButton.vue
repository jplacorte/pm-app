<script setup lang="ts">
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton } from "@pm-web/ui";

// Define emit if you want to handle the click in the parent
const emit = defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <Button
    class="p-2 h-10 bg-[#FFE8DB] hover:bg-[#fad3bc] text-[#5682B1] rounded-lg flex items-center shadow-sm border-none transition-colors"
    @click="emit('click')"
    title="Add Product"
  >
    <IconButton :icon="faPlus" class="text-xl" />
    Add Product
  </Button>
</template>
