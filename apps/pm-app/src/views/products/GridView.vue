<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, Pagination } from "@pm-web/ui";
import type { Product } from "@pm-web/types";
import Ellipsis from "./components/Ellipsis.vue";

const itemsPerPage = 10;
const currentPage = ref(1);

const products = ref<Product[]>(
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Tonberry Treat #${i + 1}`,
    price: 100 + i * 10,
    category: i % 2 === 0 ? "Pastry" : "Beverage",
    image: `https://placehold.co/300x200/5682B1/white?text=Treat+${i + 1}`,
  })),
);

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function goToPage(page: number) {
  currentPage.value = page;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
}

const activeMenuId = ref<number | null>(null);

const toggleMenu = (id: number) => {
  if (activeMenuId.value === id) {
    activeMenuId.value = null; // Close if clicking same one
  } else {
    activeMenuId.value = id; // Open new one
  }
};

const handleView = (product: Product) => {
  console.log("View", product.id);
  activeMenuId.value = null;
};

const handleUpdate = (product: Product) => {
  console.log("Update", product.id);
  activeMenuId.value = null;
};

const handleDelete = (product: Product) => {
  if (confirm(`Are you sure you want to delete ${product.name}?`)) {
    console.log("Delete", product.id);
  }
  activeMenuId.value = null;
};
</script>

<template>
  <div class="p-8 h-full relative pb-24 overflow-y-auto">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <Card
        v-for="product in paginatedProducts"
        :key="product.id"
        class="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer bg-white relative"
      >
        <Ellipsis
          :productId="product.id"
          :activeMenuId="activeMenuId"
          :toggleMenu="toggleMenu"
          :handleView="() => handleView(product)"
          :handleUpdate="() => handleUpdate(product)"
          :handleDelete="() => handleDelete(product)"
        />
        <div class="overflow-hidden h-40 w-full">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div class="p-4 flex flex-col gap-2">
          <span
            class="text-xs font-bold text-gray-400 uppercase tracking-wider"
            >{{ product.category }}</span
          >
          <h3 class="font-bold text-lg text-slate-800 truncate">
            {{ product.name }}
          </h3>
          <p class="text-blue-600 font-semibold">
            {{ formatPrice(product.price) }}
          </p>
        </div>
      </Card>
    </div>

    <Pagination
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :prevPage="prevPage"
      :goToPage="goToPage"
      :nextPage="nextPage"
    />
  </div>
</template>
