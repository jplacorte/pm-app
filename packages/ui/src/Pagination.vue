<script setup lang="ts">
  defineOptions({
  inheritAttrs: false,
});

interface Props {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
}

defineProps<Props>();

const emit = defineEmits<(e: "click", event: MouseEvent) => void>();
</script>

<template>
  <div v-if="totalPages > 1" v-bind="$attrs" class="flex justify-center items-center space-x-2">

      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition"
      >
        Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'w-10 h-10 rounded-full font-bold transition',
          currentPage === page
            ? 'bg-[#5682B1] text-white shadow-lg scale-110'
            : 'bg-white text-slate-600 hover:bg-slate-100'
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition"
      >
        Next
      </button>

    </div>
</template>