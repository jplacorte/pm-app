<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { TextButton, TextInput } from "@pm-web/ui";
import { useApi } from "../../composables/useApi";
import TonberryIcon from "../../Images/tonberry_christmas.png";

const router = useRouter();
const { request, loading, error } = useApi();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (!email.value || !password.value) return;

  const response = await request<{ accessToken: string; user: any }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
    }
  );

  if (response) {
    // Store the token securely
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("user", JSON.stringify(response.user));
    router.push("/products");
  }
};
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center text-white"
  >
    <img :src="TonberryIcon" alt="Tonberry Cafe Logo" class="w-32 h-32 mb-6" />

    <h1 class="text-8xl mb-24 text-[#FFE8DB] font-['Pacifico',cursive]">
      Tonberry Cafe
    </h1>

    <div
      class="flex flex-col w-96 space-y-6 bg-[#FFE8DB] p-8 rounded-lg items-center text-center"
    >
      <p v-if="error" class="text-red-500 font-bold">{{ error }}</p>

      <TextInput
        :modelValue="email"
        @update:modelValue="(newValue) => (email = newValue)"
        placeholder="Enter your email address"
      />

      <TextInput
        :modelValue="password"
        @update:modelValue="(newValue) => (password = newValue)"
        type="password"
        placeholder="Enter your password"
      />

      <TextButton
        :label="loading ? 'Logging in...' : 'Login'"
        :disabled="loading"
        @click="handleLogin"
      />

      <div class="flex flex-row space-x-2">
        <span class="text-gray-500">Don't have an account?</span>
        <RouterLink
          to="/auth/register"
          class="font-medium text-[#739EC9] hover:text-[#5682B1]"
        >
          Register
        </RouterLink>
      </div>
    </div>
  </div>
</template>
