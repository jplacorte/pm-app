<script setup lang="ts">
import { ref } from 'vue';
import Category from './Category.vue';
import GridView from './GridView.vue';
import ListView from './ListView.vue';
import ToggleButton from './ToggleButton.vue';
// State logic
const viewMode = ref<'grid' | 'list'>('grid');
</script>

<template>
  <div class="w-full h-full flex flex-col pt-10 relative">

    <div class="relative w-full flex justify-center items-center mb-4 px-8">

      <Category />


        <ToggleButton v-model="viewMode" />
      </div>



    <div class="flex-1 overflow-hidden">
      <GridView v-if="viewMode === 'grid'" />
      <ListView v-else-if="viewMode === 'list'" />
    </div>
    </div>
</template>