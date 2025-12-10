<script setup lang="ts">
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@pm-web/ui';

interface Props {
  modelValue: 'grid' | 'list';
}

 defineProps<Props>();

const emit = defineEmits<{
(e: 'update:modelValue', value: 'grid' | 'list'): void}>();

function toggle(value: 'grid' | 'list'){
  emit('update:modelValue', value);
};

</script>
<template>
   <div class="absolute right-8 top-1/2 transform -translate-y-1/2">
    <div class="flex flex-row bg-[#FFE8DB] rounded-lg">
  <Button
         @click="toggle('grid')"
          class="w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200 border-none"
          :class="modelValue === 'grid' ? 'bg-[#5682B1] text-white shadow-sm' : 'text-[#5682B1] hover:bg-white/50'"
          title="Grid View"
        >
         <IconButton :icon="faTh" class="text-3xl"/>
        </Button>

        <Button
         @click="toggle('list')"
          class="w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200 border-none"
          :class="modelValue === 'list' ? 'bg-[#5682B1] text=[#FFE8DB] shadow-sm' : 'text-[#5682B1] hover:bg-white/50'"
          title="List View"
        >
         <IconButton :icon="faList" class="text-3xl"/>
        </Button>
        </div>
        </div>

</template>