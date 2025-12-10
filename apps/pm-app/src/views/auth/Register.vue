<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-3xl font-bold mb-6 text-blue-950 text-center">Register</h2>
      <form class="space-y-4">
        <TextInput label="Username" placeholder="Enter your username" />
        <TextInput label="Email" type="email" placeholder="Enter your email" />
        <TextInput label="Password" type="password" placeholder="Enter your password" />
        <TextInput label="Confirm Password" type="password" placeholder="Confirm your password" />
        <div class="flex justify-center mt-6">
          <TextButton label="Register" class="w-full" />
        </div>
      </form>
    </div>
  </div>
</template>