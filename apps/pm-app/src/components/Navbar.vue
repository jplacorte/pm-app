<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Button, IconButton, Popover } from "@pm-web/ui";
import TonberryIcon from "../Images/tonberry_christmas.png";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useApi } from "../composables/useApi";

const router = useRouter();
const { request } = useApi();
const firstName = ref("User");

onMounted(() => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.name) {
        // Split "John Doe" -> ["John", "Doe"] -> take "John"
        firstName.value = user.name.split(" ")[0];
      }
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }
});

const handleLogout = async () => {
  try {
    // 1. Call Backend Logout
    await request("/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // 2. Clear Client Storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // 3. Redirect
    router.push("/auth/login");
  }
};
</script>

<template>
  <div
    class="flex flex-row w-full h-fit bg-[#FFE8DB] items-center p-2 text-cyan-950 justify-between z-50 relative shadow-sm"
  >
    <Button class="border-none">
      <div class="flex items-center gap-2">
        <img :src="TonberryIcon" class="w-10 h-10" />
        <span class="text-[#5682B1] text-lg font-['Pacifico',cursive]"
          >Tonberry Cafe</span
        >
      </div>
    </Button>

    <div class="mr-2">
      <Popover>
        <template #trigger>
          <IconButton
            :icon="faCircleUser"
            class="text-3xl text-[#5682B1] hover:text-[#4a7eb3] transition-colors cursor-pointer"
          />
        </template>

        <template #content="{ close }">
          <div
            class="p-1 flex flex-col gap-1 border border-slate-100 rounded-lg bg-white shadow-lg min-w-[140px]"
          >
            <div
              class="px-3 py-2 text-2xl text-center font-bold font-['Pacifico',cursive] text-[#5682B1] border-b border-gray-100 mb-1"
            >
              {{ firstName }}
            </div>

            <Button
              class="w-full text-left px-3 py-2 text-lg text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap border-none font-semibold"
              @click="
                () => {
                  handleLogout();
                  close();
                }
              "
            >
              <IconButton :icon="faRightFromBracket" />
              Logout
            </Button>
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>
