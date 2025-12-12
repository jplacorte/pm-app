<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  Button,
  IconButton,
  Popover,
  Modal,
  TextInput,
  TextButton,
} from "@pm-web/ui";
import TonberryIcon from "../Images/tonberry_christmas.png";
import {
  faCircleUser,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useApi } from "../composables/useApi";

const router = useRouter();
const { request } = useApi();

// Profile State
const showProfileModal = ref(false);
const isEditing = ref(false);
const userForm = reactive({
  name: "",
  email: "",
});

onMounted(() => {
  loadUser();
});

const loadUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      userForm.name = user.name || "";
      userForm.email = user.email || "";
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }
};

const handleLogout = async () => {
  try {
    await request("/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push("/auth/login");
  }
};

const toggleEdit = () => {
  if (isEditing.value) {
    // Save Logic (Simulated)
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      const updatedUser = {
        ...user,
        name: userForm.name,
        email: userForm.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    isEditing.value = false;
  } else {
    isEditing.value = true;
  }
};

const openProfile = () => {
  loadUser(); // Reset form to current storage
  isEditing.value = false;
  showProfileModal.value = true;
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
            class="p-1 flex flex-col gap-1 border border-slate-100 rounded-lg bg-white shadow-lg min-w-[160px]"
          >
            <Button
              class="w-full text-left px-3 py-2 text-sm text-[#5682B1] hover:bg-[#FFE8DB]/50 rounded-md transition-colors flex items-center gap-2 font-semibold border-none"
              @click="
                () => {
                  openProfile();
                  close();
                }
              "
            >
              <IconButton :icon="faUser" class="text-sm" />
              My Profile
            </Button>

            <div class="h-[1px] bg-gray-100 mx-2 my-0.5"></div>

            <Button
              class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap border-none font-semibold"
              @click="
                () => {
                  handleLogout();
                  close();
                }
              "
            >
              <IconButton :icon="faRightFromBracket" class="text-sm" />
              Logout
            </Button>
          </div>
        </template>
      </Popover>
    </div>

    <Modal
      :isOpen="showProfileModal"
      title="User Profile"
      @close="showProfileModal = false"
    >
      <div class="flex flex-col gap-6 min-w-[300px]">
        <div class="flex justify-center">
          <div
            class="w-24 h-24 bg-[#739EC9] rounded-full flex items-center justify-center border-4 border-white shadow-md"
          >
            <span class="font-['Pacifico',cursive] text-4xl text-white">
              {{ userForm.name.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <TextInput
            label="Full Name"
            v-model="userForm.name"
            placeholder="Your Name"
            :disabled="!isEditing"
          />
          <TextInput
            label="Email Address"
            v-model="userForm.email"
            placeholder="email@example.com"
            :disabled="!isEditing"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex flex-row w-full space-x-2 items-center">
          <TextButton
            label="Close"
            @click="showProfileModal = false"
            class="bg-gray-400"
          />
          <TextButton
            :label="isEditing ? 'Save Changes' : 'Edit Profile'"
            @click="toggleEdit"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
