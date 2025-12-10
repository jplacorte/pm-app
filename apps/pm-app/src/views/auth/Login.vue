<script setup lang="ts">
import { TextButton, TextInput } from '@pm-web/ui';
import router from '../../router';

const handleClick = () => {
	router.push("/");
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center bg-blue-950 text-white">

    <h1 class="text-7xl font-bold mb-24">Login</h1>

    <div class="flex flex-col w-72 gap-6">
      <TextInput
        placeholder="Enter your username"
      />

      <TextInput
        placeholder="Enter your password"
      />

      <TextButton
        label="Login"
        @click="handleClick"
      />
    </div>

  </div>
</template>