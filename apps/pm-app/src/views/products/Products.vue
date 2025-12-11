<script setup lang="ts">
import { ref } from "vue";
import Categories from "./components/Categories.vue";
import GridView from "./GridView.vue";
import ListView from "./ListView.vue";
import ToggleButton from "./components/ToggleButton.vue";
import AddButton from "./components/AddButton.vue";
import AddProductModal from "./components/AddProducModal.vue";

const viewMode = ref<"grid" | "list">("grid");
const showAddModal = ref(false);
const refreshKey = ref(0);

// 1. Initialize default category to 'All'
const selectedCategory = ref("All");

const handleRefresh = () => {
  refreshKey.value++;
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
      />
      <ListView
        v-else-if="viewMode === 'list'"
        :key="`list-${refreshKey}`"
        :selectedCategory="selectedCategory"
      />
    </div>

    <AddProductModal
      :isOpen="showAddModal"
      @close="showAddModal = false"
      @refresh="handleRefresh"
    />
  </div>
</template>
