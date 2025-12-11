<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useApi } from "../../composables/useApi";
import { Card, Pagination } from "@pm-web/ui";
import type { Product } from "@pm-web/types";
import Ellipsis from "./components/Buttons/Ellipsis.vue";
import EmptyState from "./components/EmptyState.vue";
import LoadingState from "../../components/LoadingState.vue"; // Shared component

const props = defineProps<{
  selectedCategory: string;
}>();

const emit = defineEmits<{
  (e: "view", product: Product): void;
  (e: "edit", product: Product): void;
  (e: "delete", product: Product): void;
}>();

const { request } = useApi();
const products = ref<Product[]>([]);
const itemsPerPage = 10;
const currentPage = ref(1);
const isLoading = ref(true); // Local loading state for the delay

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    // 5-second delay
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await request<Product[]>("/products");
    if (data) {
      products.value = data;
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProducts);

const filteredProducts = computed(() => {
  if (!props.selectedCategory || props.selectedCategory === "All") {
    return products.value;
  }
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
  () => {
    currentPage.value = 1;
  }
);

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};
</script>

<template>
  <div class="p-8 h-full relative pb-24 overflow-y-auto">
    <LoadingState v-if="isLoading" message="Baking your products..." />

    <template v-else>
      <EmptyState :visible="products.length === 0" />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <Card
          v-on:click="() => emit('view', product)"
          v-for="product in paginatedProducts"
          :key="product.id"
          class="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer bg-white relative overflow-visible!"
        >
          <Ellipsis
            :productId="product.id"
            :handleView="() => emit('view', product)"
            :handleUpdate="() => emit('edit', product)"
            :handleDelete="() => emit('delete', product)"
          />

          <div class="overflow-hidden h-40 w-full rounded-t-lg">
            <img
              :src="
                product.image || 'https://placehold.co/300x200?text=No+Image'
              "
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div class="p-4 flex flex-col gap-2 flex-1">
            <div class="flex justify-between items-start">
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider"
              >
                {{ product.category }}
              </span>
              <span class="text-blue-600 font-bold">
                {{ formatPrice(product.price) }}
              </span>
            </div>

            <h3
              class="font-bold text-lg text-slate-800 truncate"
              :title="product.name"
            >
              {{ product.name }}
            </h3>

            <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {{ product.description }}
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
    </template>
  </div>
</template>
