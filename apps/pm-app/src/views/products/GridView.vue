<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { Card, Pagination } from "@pm-web/ui";
import type { Product } from "@pm-web/types";
import Ellipsis from "./components/Ellipsis.vue";
import { useApi } from "../../composables/useApi";

// 1. Accept selectedCategory prop
const props = defineProps<{
  selectedCategory: string;
}>();

const { request } = useApi();
const products = ref<Product[]>([]);
const itemsPerPage = 10;
const currentPage = ref(1);

const fetchProducts = async () => {
  const data = await request<Product[]>("/products");
  if (data) {
    products.value = data;
  }
};

onMounted(fetchProducts);

// 2. Computed property for filtering
const filteredProducts = computed(() => {
  if (!props.selectedCategory || props.selectedCategory === "All") {
    return products.value;
  }
  return products.value.filter((p) => p.category === props.selectedCategory);
});

// 3. Use filteredProducts for pagination
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Reset page when category changes
watch(
  () => props.selectedCategory,
  () => {
    currentPage.value = 1;
  }
);

const activeMenuId = ref<number | null>(null);
const toggleMenu = (id: number) => {
  activeMenuId.value = activeMenuId.value === id ? null : id;
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};
</script>

<template>
  <div class="p-8 h-full relative pb-24 overflow-y-auto">
    <div
      v-if="filteredProducts.length === 0"
      class="text-center text-gray-500 mt-10"
    >
      {{
        products.length === 0
          ? "Loading..."
          : "No products found in this category."
      }}
    </div>

    <div
      v-else
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
          :handleView="() => {}"
          :handleUpdate="() => {}"
          :handleDelete="() => {}"
        />
        <div class="overflow-hidden h-40 w-full">
          <img
            :src="product.image || 'https://placehold.co/300x200?text=No+Image'"
            :alt="product.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div class="p-4 flex flex-col gap-2">
          <span
            class="text-xs font-bold text-gray-400 uppercase tracking-wider"
          >
            {{ product.category }}
          </span>
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
      v-if="totalPages > 1"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :prevPage="() => currentPage > 1 && currentPage--"
      :goToPage="(p) => (currentPage = p)"
      :nextPage="() => currentPage < totalPages && currentPage++"
    />
  </div>
</template>
