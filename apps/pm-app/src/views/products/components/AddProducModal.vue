<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal, TextButton, TextInput, Dropdown } from "@pm-web/ui";
import { Categories } from "@pm-web/types";
import { useApi } from "../../../composables/useApi";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const { request, loading, error } = useApi();

const form = reactive({
  name: "",
  price: "",
  category: "",
});

// State for the selected file
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    selectedFile.value = file;
    // Create local preview
    previewUrl.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  if (!form.name || !form.price || !form.category || !selectedFile.value) {
    alert("Please fill in all required fields and select an image.");
    return;
  }

  // 1. Create FormData
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("price", form.price); // Sent as string
  formData.append("category", form.category);
  formData.append("image", selectedFile.value); // Append the file

  // 2. Send Request (useApi handles headers automatically)
  const response = await request("/products", {
    method: "POST",
    body: formData,
  });

  if (response) {
    form.name = "";
    form.price = "";
    form.category = "";
    selectedFile.value = null;
    previewUrl.value = null;

    emit("refresh");
    emit("close");
  }
};
</script>

<template>
  <Modal :isOpen="isOpen" title="Add New Treat" @close="emit('close')">
    <div class="flex flex-col gap-4">
      <p v-if="error" class="text-red-500 text-sm font-bold text-center">
        {{ error }}
      </p>

      <TextInput
        label="Product Name"
        v-model="form.name"
        placeholder="e.g. Strawberry Shortcake"
      />

      <div class="grid grid-cols-2 gap-4">
        <TextInput
          label="Price"
          v-model="form.price"
          placeholder="0.00"
          type="number"
          step="0.01"
        />

        <Dropdown
          label="Category"
          v-model="form.category"
          :options="Categories"
          placeholder="Select..."
        />
      </div>

      <div class="flex flex-col space-y-1">
        <label class="text-blue-950 font-medium text-start"
          >Product Image</label
        >
        <div class="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFE8DB] file:text-[#5682B1] hover:file:bg-[#fcdcc9] cursor-pointer"
          />
        </div>

        <div
          v-if="previewUrl"
          class="mt-2 h-32 w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
        >
          <img
            :src="previewUrl"
            class="w-full h-full object-cover"
            alt="Preview"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full gap-2">
        <TextButton
          label="Cancel"
          class="bg-gray-400 hover:bg-gray-500 text-white"
          @click="emit('close')"
        />
        <TextButton
          :label="loading ? 'Uploading...' : 'Add Treat'"
          :disabled="loading"
          @click="handleSubmit"
        />
      </div>
    </template>
  </Modal>
</template>
