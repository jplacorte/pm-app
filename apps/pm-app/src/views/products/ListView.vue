<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { Pagination } from "@pm-web/ui";
import type { Product } from "@pm-web/types";
import { useApi } from "../../composables/useApi"; // Ensure we fetch real data here too

// 1. Accept Prop
const props = defineProps<{
  selectedCategory: string;
}>();

const { request } = useApi();
const products = ref<Product[]>([]);
const itemsPerPage = 10;
const currentPage = ref(1);

// Fetch real data
const fetchProducts = async () => {
  const data = await request<Product[]>("/products");
  if (data) products.value = data;
};

onMounted(fetchProducts);

// 2. Filter Logic
const filteredProducts = computed(() => {
  if (props.selectedCategory === "All") return products.value;
  return products.value.filter((p) => p.category === props.selectedCategory);
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

watch(
  () => props.selectedCategory,
  () => (currentPage.value = 1)
);

const formatPrice = (val: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    val
  );
</script>

<template>
  <div class="h-full relative flex flex-col overflow-hidden">
    <div
      class="flex-1 overflow-y-auto p-8 pb-32 flex flex-col gap-4 no-scrollbar"
    >
      <div
        v-if="filteredProducts.length === 0"
        class="text-center text-gray-500 mt-4"
      >
        No products found.
      </div>

      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="flex flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-transparent hover:border-[#5682B1] hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div class="w-24 h-24 shrink-0 rounded-md overflow-hidden bg-gray-100">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div class="ml-6 flex-1 flex flex-col justify-center">
          <span
            class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"
          >
            {{ product.category }}
          </span>
          <h3 class="font-bold text-xl text-slate-800">{{ product.name }}</h3>
          <p class="text-sm text-gray-500 mt-1 line-clamp-1">
            Delicious homemade {{ product.category.toLowerCase() }} made with
            love.
          </p>
        </div>
        <div class="ml-4 flex flex-col items-end justify-center min-w-[100px]">
          <span class="text-blue-600 font-bold text-lg">{{
            formatPrice(product.price)
          }}</span>
        </div>
      </div>
    </div>

    <Pagination
      v-if="totalPages > 1"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :prevPage="() => currentPage > 1 && currentPage--"
      :goToPage="(p) => (currentPage = p)"
      :nextPage="() => currentPage < totalPages && currentPage++"
    />
  </div>
</template>
