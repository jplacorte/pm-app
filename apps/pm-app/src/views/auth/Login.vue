<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { IconButton, TextButton, TextInput } from "@pm-web/ui";
import { useApi } from "../../composables/useApi";
import TonberryIcon from "../../Images/tonberry_christmas.png";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import LoadingState from "../../components/LoadingState.vue";

const router = useRouter();
const { request, error } = useApi();

const email = ref("");
const password = ref("");
const isLoggingIn = ref(false);

const handleLogin = async () => {
  error.value = null;

  if (!email.value || !password.value) {
    error.value = "Please enter both email and password.";
    return;
  }

  isLoggingIn.value = true;

  try {
    // Artificial 5-second delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await request<{ accessToken: string; user: any }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email: email.value, password: password.value }),
      }
    );

    if (response) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/products");
    } else {
      if (!error.value) error.value = "Invalid credentials";
      isLoggingIn.value = false;
    }
  } catch (e) {
    isLoggingIn.value = false;
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

    <LoadingState v-if="isLoggingIn" message="Logging in..." isCard />

    <form
      v-else
      @submit.prevent="handleLogin"
      class="flex flex-col w-96 space-y-6 bg-[#FFE8DB] p-8 rounded-lg items-center text-center shadow-xl border-4 border-[#739EC9] min-h-[400px] justify-center"
    >
      <div
        v-if="error"
        class="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm flex items-center gap-2 text-left"
        role="alert"
      >
        <IconButton :icon="faExclamationCircle" />
        <span class="font-medium">{{ error }}</span>
      </div>

      <div class="w-full space-y-6">
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
          :label="isLoggingIn ? 'Logging in...' : 'Login'"
          :disabled="isLoggingIn"
          type="submit"
        />
      </div>

      <div class="flex flex-row space-x-2 justify-center">
        <span class="text-gray-500">Don't have an account?</span>
        <RouterLink
          to="/auth/register"
          class="font-medium text-[#739EC9] hover:text-[#5682B1]"
        >
          Register
        </RouterLink>
      </div>
    </form>
  </div>
</template>
