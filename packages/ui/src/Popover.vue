<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const toggle = () => (isOpen.value = !isOpen.value);
const close = () => (isOpen.value = false);

const handleClickOutside = (event: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div ref="wrapperRef" class="relative inline-block text-left">
    <div @click.stop="toggle">
      <slot name="trigger" :isOpen="isOpen" />
    </div>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-1 origin-top-right rounded-lg bg-white shadow-xl ring-2 ring-[#739EC9] ring-opacity-5 focus:outline-none min-w-[100px]"
        @click.stop
      >
        <slot name="content" :close="close" />
      </div>
    </Transition>
  </div>
</template>
