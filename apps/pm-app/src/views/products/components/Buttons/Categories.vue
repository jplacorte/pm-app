<script setup lang="ts">
import { Categories } from "@pm-web/types"; // Ensure this is imported
import { nextTick, onMounted, ref, watch } from "vue";

// 1. Accept modelValue prop
const props = defineProps<{
  modelValue: string;
}>();

// 2. Define emit for v-model
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const sliderStyle = ref({
  left: "0px",
  width: "0px",
  opacity: 0,
});

const itemRefs = ref<Record<string, HTMLElement | null>>({});

function setItemRef(el: any, key: string) {
  if (el) itemRefs.value[key] = el;
}

async function moveSlider() {
  await nextTick();
  // 3. Use prop instead of local state
  const activeEl = itemRefs.value[props.modelValue];

  if (activeEl) {
    sliderStyle.value = {
      left: `${activeEl.offsetLeft}px`,
      width: `${activeEl.offsetWidth}px`,
      opacity: 1,
    };
  }
}

const selectCategory = (category: string) => {
  // 4. Emit update to parent
  emit("update:modelValue", category);
};

// 5. Watch prop to update slider when parent changes it
watch(() => props.modelValue, moveSlider);

onMounted(() => {
  moveSlider();
  window.addEventListener("resize", moveSlider);
});
</script>

<template>
  <div
    class="relative flex flex-row space-x-8 w-full justify-center text-3xl pb-4"
  >
    <div
      class="absolute bottom-0 h-1 bg-[#FFE8DB] rounded-full shadow-[0_0_10px_#FFE8DB] transition-all duration-300 ease-in-out pointer-events-none"
      :style="{
        left: sliderStyle.left,
        width: sliderStyle.width,
        opacity: sliderStyle.opacity,
      }"
    ></div>

    <a
      href="#"
      :ref="(el) => setItemRef(el, 'All')"
      @click.prevent="selectCategory('All')"
      class="font-['Pacifico',cursive] transition-colors z-10"
      :class="
        modelValue === 'All'
          ? 'text-[#FFE8DB] font-bold'
          : 'text-[#FFE8DB]/70 hover:text-[#FFE8DB]'
      "
    >
      All
    </a>

    <a
      v-for="category in Categories"
      :key="category"
      :ref="(el) => setItemRef(el, category)"
      href="#"
      @click.prevent="selectCategory(category)"
      class="font-['Pacifico',cursive] transition-colors z-10"
      :class="
        modelValue === category
          ? 'text-[#FFE8DB] font-bold'
          : 'text-[#FFE8DB]/70 hover:text-[#FFE8DB]'
      "
    >
      {{ category }}
    </a>
  </div>
</template>
