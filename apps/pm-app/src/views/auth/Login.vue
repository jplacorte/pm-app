<script setup lang="ts">
import { TextButton, TextInput } from '@pm-web/ui';
import router from '../../router';

const handleClick = () => {
	router.push("/");
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center text-white">

    <img src="../../Images/tonberry_christmas.png" alt="Tonberry Cafe Logo" class="w-32 h-32 mb-8"/>

    <h1 class="text-8xl mb-24 text-[#FFE8DB] font-['Pacifico',cursive]">
      Tonberry Cafe
    </h1>

    <div class="flex flex-col w-96 space-y-6 bg-[#FFE8DB] p-4 rounded-lg items-center text-center">
      <TextInput
        placeholder="Enter your username"
      />

      <TextInput
        type="password"
        placeholder="Enter your password"
      />

      <TextButton
        label="Login"
        @click="handleClick"
      />

      <div class="flex flex-row space-x-2"><span class="text-gray-500">Don't have an account?</span><RouterLink to="/auth/register" class="font-medium text-[#739EC9] hover:text-[#5682B1]">Register</RouterLink></div>
    </div>

  </div>
</template>