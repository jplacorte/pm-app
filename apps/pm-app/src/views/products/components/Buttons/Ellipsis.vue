<script setup lang="ts">
import {
  faEllipsis,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton, Button, Popover } from "@pm-web/ui";

interface Props {
  productId: number;
  handleView: (productId: number) => void;
  handleUpdate: (productId: number) => void;
  handleDelete: (productId: number) => void;
}

defineProps<Props>();
</script>

<template>
  <div class="absolute top-2 right-2 z-20">
    <Popover>
      <template #trigger="{ isOpen }">
        <IconButton
          :icon="faEllipsis"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm"
          :class="[
            isOpen
              ? 'bg-[#739EC9] text-white'
              : 'bg-white/80 backdrop-blur-sm text-[#5682B1] hover:bg-[#739EC9] hover:text-white',
          ]"
        />
      </template>

      <template #content="{ close }">
        <div class="p-1 flex flex-col gap-1 border border-slate-100 rounded-lg">
          <Button
            class="w-full text-left px-3 py-2 text-sm text-[#5682B1] hover:bg-slate-100 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap border-none"
            @click="
              () => {
                handleView(productId);
                close();
              }
            "
          >
            <IconButton :icon="faEye" class="text-xs" /> View
          </Button>

          <Button
            class="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap border-none"
            @click="
              () => {
                handleUpdate(productId);
                close();
              }
            "
          >
            <IconButton :icon="faPen" class="text-xs" /> Update
          </Button>

          <Button
            class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap border-none"
            @click="
              () => {
                handleDelete(productId);
                close();
              }
            "
          >
            <IconButton :icon="faTrash" class="text-xs" /> Delete
          </Button>
        </div>
      </template>
    </Popover>
  </div>
</template>
