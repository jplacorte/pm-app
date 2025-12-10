<script setup lang="ts">
import { ref, computed } from 'vue';
import { Pagination } from '@pm-web/ui';
import type { Product } from '@pm-web/types';

const itemsPerPage = 10;
const currentPage = ref(1);

// Dummy Data
const products = ref<Product[]>(Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Tonberry Treat #${i + 1}`,
  price: 100 + (i * 10),
  category: i % 2 === 0 ? 'Pastry' : 'Beverage',
  image: `https://placehold.co/300x200/5682B1/white?text=Treat+${i + 1}`
})));

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const goToPage = (page: number) => { currentPage.value = page; };

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
};
</script>

<template>
  <div class="h-full relative flex flex-col overflow-hidden">

    <div class="flex-1 overflow-y-auto p-8 pb-32 flex flex-col gap-4 no-scrollbar">

      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="flex flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-transparent
               hover:border-[#5682B1] hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
          <div class="w-24 h-24 shrink-0 rounded-md overflow-hidden bg-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div class="ml-6 flex-1 flex flex-col justify-center">
             <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{{ product.category }}</span>
             <h3 class="font-bold text-xl text-slate-800">{{ product.name }}</h3>
             <p class="text-sm text-gray-500 mt-1 line-clamp-1">Delicious homemade {{ product.category.toLowerCase() }} made with love.</p>
          </div>

          <div class="ml-4 flex flex-col items-end justify-center min-w-[100px]">
             <span class="text-blue-600 font-bold text-lg">{{ formatPrice(product.price) }}</span>
             <button class="mt-2 text-xs font-bold text-[#5682B1] hover:text-[#ff9100] hover:underline uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                View Details
             </button>
          </div>
      </div>

    </div>

    <Pagination
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :prevPage="prevPage"
      :goToPage="goToPage"
      :nextPage="nextPage"
    />

  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>