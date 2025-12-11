<script setup lang="ts">
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Props {
  isOpen: boolean;
  title?: string;
}

defineProps<Props>();

const emit = defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="emit('close')"
        ></div>

        <div
          class="relative bg-[#FFE8DB] w-full max-w-md m-4 rounded-xl shadow-2xl border-4 border-[#739EC9] transform transition-all flex flex-col max-h-[90vh]"
        >
          <div
            class="flex items-center justify-between p-4 border-b-2 border-[#739EC9]/20"
          >
            <h3
              v-if="title"
              class="text-2xl text-[#5682B1] font-['Pacifico',cursive]"
            >
              {{ title }}
            </h3>
            <button
              @click="emit('close')"
              class="text-[#739EC9] hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50"
            >
              <font-awesome-icon :icon="faTimes" size="lg" />
            </button>
          </div>

          <div class="p-6 overflow-y-auto">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="p-4 border-t-2 border-[#739EC9]/20 flex justify-end gap-2"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
