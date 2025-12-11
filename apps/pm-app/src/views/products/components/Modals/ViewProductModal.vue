<script setup lang="ts">
import { Modal, TextButton } from "@pm-web/ui";
import type { Product } from "@pm-web/types";

const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const formatPrice = (value: number | undefined) => {
  if (value === undefined) return "";
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};
</script>

<template>
  <Modal :isOpen="isOpen" title="Product Details" @close="emit('close')">
    <div v-if="product" class="flex flex-col gap-6">
      <div
        class="w-full h-48 rounded-lg overflow-hidden border-2 border-[#739EC9] shadow-sm bg-gray-50"
      >
        <img
          :src="product.image || 'https://placehold.co/600x400?text=No+Image'"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="space-y-4">
        <div
          class="flex justify-between items-start border-b border-[#739EC9]/30 pb-2"
        >
          <div>
            <span
              class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1"
            >
              {{ product.category }}
            </span>
            <h3
              class="text-2xl font-bold text-[#5682B1] font-['Pacifico',cursive] tracking-wide"
            >
              {{ product.name }}
            </h3>
          </div>
          <div
            class="text-xl font-bold text-[#5682B1] bg-[#FFE8DB] px-3 py-1 rounded-lg border border-[#739EC9]"
          >
            {{ formatPrice(product.price) }}
          </div>
        </div>

        <div>
          <label
            class="text-xs font-bold text-gray-400 uppercase tracking-wider"
            >Description</label
          >
          <p
            class="text-[#5682B1] mt-1 leading-relaxed text-sm bg-[#FFE8DB] p-3 rounded-lg border-2 border-[#739EC9]"
          >
            {{ product.description || "No description provided." }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full justify-end">
        <TextButton
          label="Close"
          class="bg-gray-400 hover:bg-gray-500 text-white min-w-[100px]"
          @click="emit('close')"
        />
      </div>
    </template>
  </Modal>
</template>
