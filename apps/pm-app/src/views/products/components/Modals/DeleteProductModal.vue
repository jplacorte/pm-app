<script setup lang="ts">
import { Modal, TextButton } from "@pm-web/ui";
import { useApi } from "../../../../composables/useApi";
import type { Product } from "@pm-web/types";

const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const { request, loading } = useApi();

const handleDelete = async () => {
  if (!props.product) return;

  const response = await request(`/products/${props.product.id}`, {
    method: "DELETE",
  });

  if (response) {
    emit("refresh");
    emit("close");
  }
};
</script>

<template>
  <Modal :isOpen="isOpen" title="Confirm Delete" @close="emit('close')">
    <div class="flex flex-col gap-4 text-center">
      <p class="text-slate-600">
        Are you sure you want to delete
        <span class="font-bold text-slate-800">{{ product?.name }}</span
        >?
        <br />
        This action cannot be undone.
      </p>
    </div>

    <template #footer>
      <div class="flex w-full gap-2 justify-end">
        <TextButton
          label="Cancel"
          class="bg-gray-400 hover:bg-gray-500 text-white"
          @click="emit('close')"
        />
        <TextButton
          :label="loading ? 'Deleting...' : 'Delete'"
          :disabled="loading"
          class="bg-red-500 hover:bg-red-600 text-white"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
</template>
