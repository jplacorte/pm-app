<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { IconButton, TextButton, TextInput } from "@pm-web/ui";
import TonberryIcon from "../../Images/tonberry_christmas.png";

const router = useRouter();
const loading = ref(false);

// 1. Reactive state to store input data
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  if (!form.value.email || !form.value.password || !form.value.firstName) {
    alert("Please fill in all fields");
    return;
  }

  loading.value = true;

  try {
    // 2. Send data to your running NestJS Backend
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password,
        name: `${form.value.firstName} ${form.value.lastName}`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // 3. Save token and go to products page
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/products");
    } else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to connect to the server.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="flex flex-col w-96 items-center">
      <img :src="TonberryIcon" alt="Tonberry Cafe Logo" class="w-32 h-32" />
      <h2
        class="text-8xl mb-24 text-[#FFE8DB] text-center font-['Pacifico',cursive]"
      >
        Register
      </h2>
      <div class="flex flex-row justify-start w-full">
        <RouterLink
          to="/auth/login"
          class="flex flex-row items-center text-[#FFE8DB] hover:text-[#fcdcc9] pb-6 space-x-1"
        >
          <IconButton :icon="faArrowCircleLeft" class="text-xl" />
          <span class="font-medium text-lg">Back</span>
        </RouterLink>
      </div>
    </div>

    <div class="flex flex-col bg-[#FFE8DB] p-8 rounded-lg w-96">
      <form class="space-y-4" @submit.prevent="handleRegister">
        <TextInput v-model="form.firstName" placeholder="First Name" />
        <TextInput v-model="form.lastName" placeholder="Last Name" />
        <TextInput v-model="form.email" placeholder="Email" type="email" />
        <TextInput
          v-model="form.password"
          placeholder="Password"
          type="password"
        />

        <TextButton
          :label="loading ? 'Loading...' : 'Register'"
          type="submit"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
</template>
