<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  faArrowCircleLeft,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton, TextButton, TextInput } from "@pm-web/ui";
import { useApi } from "../../composables/useApi";
import TonberryIcon from "../../Images/tonberry_christmas.png";
import LoadingState from "../../components/LoadingState.vue";

const router = useRouter();
const { request, error } = useApi();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const isRegistering = ref(false);

const handleRegister = async () => {
  error.value = null;

  if (
    !form.value.email ||
    !form.value.password ||
    !form.value.firstName ||
    !form.value.lastName
  ) {
    error.value = "Please fill in all fields.";
    return;
  }

  if (form.value.password.length < 4) {
    error.value = "Password must be at least 4 characters";
    return;
  }

  isRegistering.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await request<{ accessToken: string; user: any }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          email: form.value.email,
          password: form.value.password,
          name: `${form.value.firstName} ${form.value.lastName}`,
        }),
      }
    );

    if (response) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/products");
    } else {
      isRegistering.value = false;
    }
  } catch (e) {
    isRegistering.value = false;
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
          v-if="!isRegistering"
          to="/auth/login"
          class="flex flex-row items-center text-[#FFE8DB] hover:text-[#fcdcc9] pb-6 space-x-1"
        >
          <IconButton :icon="faArrowCircleLeft" class="text-xl" />
          <span class="font-medium text-lg">Back</span>
        </RouterLink>
        <div v-else class="h-9 pb-6"></div>
      </div>
    </div>

    <LoadingState v-if="isRegistering" message="Creating Account..." isCard />

    <form
      v-else
      @submit.prevent="handleRegister"
      class="flex flex-col bg-[#FFE8DB] p-8 rounded-lg w-96 shadow-xl border-4 border-[#739EC9] min-h-[400px]"
    >
      <div
        v-if="error"
        class="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm flex items-center gap-2 text-left mb-4"
        role="alert"
      >
        <IconButton :icon="faExclamationCircle" />
        <span class="font-medium">{{ error }}</span>
      </div>

      <div class="space-y-4">
        <TextInput v-model="form.firstName" placeholder="First Name" />
        <TextInput v-model="form.lastName" placeholder="Last Name" />
        <TextInput v-model="form.email" placeholder="Email" type="email" />
        <TextInput
          v-model="form.password"
          placeholder="Password"
          type="password"
        />

        <TextButton
          :label="isRegistering ? 'Creating Account...' : 'Register'"
          type="submit"
          :disabled="isRegistering"
        />
      </div>
    </form>
  </div>
</template>
