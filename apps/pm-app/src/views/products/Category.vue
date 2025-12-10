<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { Categories } from '@pm-web/types';

const activeCategory = ref('All');

const sliderStyle = ref({
  left: '0px',
  width: '0px',
  opacity: 0
});

// Need to capture the HTML elements to measure them
// We store them in a dictionary: { 'All': element, 'Beverage': element, ... }
const itemRefs = ref<Record<string, HTMLElement | null>>({});

// Helper to assign refs dynamically in the template
function setItemRef(el: any, key: string){
  if (el) itemRefs.value[key] = el;
};

// Find the active element and move the slider there
async function moveSlider() {
  await nextTick(); // Wait for DOM updates
  const activeEl = itemRefs.value[activeCategory.value];

  if (activeEl) {
    sliderStyle.value = {
      left: `${activeEl.offsetLeft}px`,
      width: `${activeEl.offsetWidth}px`,
      opacity: 1
    };
  }
};

const selectCategory = (category: string) => {
  activeCategory.value = category;
  moveSlider();
};

// Update position on mount and when window resizes (to keep it aligned)
onMounted(() => {
  moveSlider();
  window.addEventListener('resize', moveSlider);
});
</script>

<template>
  <div class="relative flex flex-row space-x-8 w-full justify-center text-3xl pb-4">

    <div
      class="absolute bottom-0 h-1 bg-[#FFE8DB] rounded-full shadow-[0_0_10px_#FFE8DB] transition-all duration-300 ease-in-out pointer-events-none"
      :style="{
        left: sliderStyle.left,
        width: sliderStyle.width,
        opacity: sliderStyle.opacity
      }"
    ></div>

    <a
      href="#"
      :ref="(el) => setItemRef(el, 'All')"
      @click.prevent="selectCategory('All')"
      class="text-[#FFE8DB] font-bold font-['Pacifico',cursive] hover:text-[#fad9c8] transition-colors z-10"
    >
      All
    </a>

    <a
      v-for="category in Categories"
      :key="category"
      :ref="(el) => setItemRef(el, category)"
      href="#"
      @click.prevent="selectCategory(category)"
      class="font-['Pacifico',cursive] text-[#FFE8DB] hover:text-[#fad9c8] transition-colors z-10"
    >
      {{ category }}
    </a>

  </div>
</template>