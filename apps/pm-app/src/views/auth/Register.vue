<script setup lang="ts">
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TextInput, TextButton, IconButton } from '@pm-web/ui';
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">

    <div class="flex flex-col w-96 items-center">
      <img src="../../Images/tonberry_christmas.png" alt="Tonberry Cafe Logo" class="w-32 h-32 "/>

      <h2 class="text-8xl mb-24 text-[#FFE8DB] text-center font-['Pacifico',cursive]">Register</h2>

      <div class="flex flex-row justify-start w-full">
        <RouterLink to="/auth/login" class="flex flex-row items-center text-[#FFE8DB] hover:text-[#fcdcc9] pb-6 space-x-1">
          <IconButton :icon="faArrowCircleLeft"/>
          <span class="font-medium text-lg">Back</span>
        </RouterLink>
      </div>
    </div>

    <div class="flex flex-col bg-[#FFE8DB] p-8 rounded-lg w-96 ">
      <form class="space-y-4">
        <TextInput placeholder="First Name"/>
        <TextInput placeholder="Last Name"/>
        <TextInput placeholder="Email"/>
        <TextInput placeholder="Password"/>
        <TextButton label="Register"/>
      </form>
    </div>
  </div>
</template>