<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "@pm-web/types";
import { Categories, ToggleButton, AddButton } from "./components/Buttons/";
import {
  AddProductModal,
  DeleteProductModal,
  UpdateProductModal,
  ViewProductModal,
} from "./components/Modals/";
import GridView from "./GridView.vue";
import ListView from "./ListView.vue";

const viewMode = ref<"grid" | "list">("grid");
const selectedCategory = ref("All");
const refreshKey = ref(0);

// Modal States
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showViewModal = ref(false);
const selectedProduct = ref<Product | null>(null);

const handleRefresh = () => {
  refreshKey.value++;
};

// Handlers
const openViewModal = (product: Product) => {
  // <--- New Handler
  selectedProduct.value = product;
  showViewModal.value = true;
};

const openEditModal = (product: Product) => {
  selectedProduct.value = product;
  showEditModal.value = true;
};

const openDeleteModal = (product: Product) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
};
</script>

<template>
  <div class="w-full h-full flex flex-col pt-10 relative">
    <div class="relative w-full flex justify-center items-center mb-4 px-8">
      <Categories v-model="selectedCategory" />

      <div
        class="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-row items-center gap-4"
      >
        <AddButton @click="showAddModal = true" />
        <ToggleButton v-model="viewMode" />
      </div>
    </div>

    <div class="flex-1 overflow-hidden">
      <GridView
        v-if="viewMode === 'grid'"
        :key="`grid-${refreshKey}`"
        :selectedCategory="selectedCategory"
        @view="openViewModal"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />
      <ListView
        v-else-if="viewMode === 'list'"
        :key="`list-${refreshKey}`"
        :selectedCategory="selectedCategory"
        @view="openViewModal"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />
    </div>

    <AddProductModal
      :isOpen="showAddModal"
      @close="showAddModal = false"
      @refresh="handleRefresh"
    />

    <ViewProductModal
      :isOpen="showViewModal"
      :product="selectedProduct"
      @close="showViewModal = false"
    />

    <UpdateProductModal
      :isOpen="showEditModal"
      :product="selectedProduct"
      @close="showEditModal = false"
      @refresh="handleRefresh"
    />

    <DeleteProductModal
      :isOpen="showDeleteModal"
      :product="selectedProduct"
      @close="showDeleteModal = false"
      @refresh="handleRefresh"
    />
  </div>
</template>
