<script setup lang="ts">
import {
  faEllipsis,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@pm-web/ui";

interface Props {
  productId: number;
  activeMenuId: number | null;
  toggleMenu: (id: number) => void;
  handleView: (productId: number) => void;
  handleUpdate: (productId: number) => void;
  handleDelete: (productId: number) => void;
}

defineProps<Props>();
</script>

<template>
  <IconButton
    :icon="faEllipsis"
    @click.stop="toggleMenu(productId)"
    class="absolute top-2 right-2 w-8 h-8 bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-[#5682B1] hover:bg-[#739EC9] hover:text-white shadow-sm z-20 transition-colors"
  />
  <div
    v-if="activeMenuId === productId"
    class="absolute text-center items-center top-11 right-2 w-20 bg-white rounded-lg shadow-xl border border-slate-100 z-30 flex flex-col py-1 overflow-hidden"
    @click.stop
  >
    <Button
      class="w-full h-full hover:bg-gray-300 rounded-lg"
      @click="handleView(productId)"
    >
      <div
        class="flex flex-row space-x-1 items-center justify-center text-center text-[#5682B1]"
      >
        <IconButton class="text-sm" :icon="faEye" /> View
      </div>
    </Button>

    <Button
      class="w-full h-full hover:bg-gray-300 rounded-lg"
      @click="handleUpdate(productId)"
    >
      <div
        class="flex flex-row space-x-1 items-center justify-center text-center text-yellow-500"
      >
        <IconButton class="text-sm" :icon="faPen" /> Update
      </div>
    </Button>

    <Button
      class="w-full h-full hover:bg-gray-300 rounded-lg"
      @click="handleDelete(productId)"
    >
      <div
        class="flex flex-row space-x-1 items-center justify-center text-center text-red-500"
      >
        <IconButton class="text-sm" :icon="faTrash" /> Delete
      </div>
    </Button>
  </div>
</template>
