<script setup lang="ts">
import { reactive, watch } from "vue";
import { Modal, TextButton, TextInput, Dropdown } from "@pm-web/ui";
import { Categories, type Product } from "@pm-web/types";
import { useApi } from "../../../../composables/useApi";

const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const { request, loading, error } = useApi();

const form = reactive({
  name: "",
  description: "",
  price: "",
  category: "",
});

// Pre-fill form when product changes or modal opens
watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name;
      form.description = newVal.description || "";
      form.price = newVal.price.toString();
      form.category = newVal.category;
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (!props.product) return;

  const payload = {
    name: form.name,
    description: form.description,
    price: parseFloat(form.price),
    category: form.category,
    // Note: Image update logic omitted as backend 'update' endpoint
    // currently expects JSON body, not Multipart file.
  };

  const response = await request(`/products/${props.product.id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (response) {
    emit("refresh");
    emit("close");
  }
};
</script>

<template>
  <Modal :isOpen="isOpen" title="Update Treat" @close="emit('close')">
    <div class="flex flex-col gap-4">
      <p v-if="error" class="text-red-500 text-sm font-bold text-center">
        {{ error }}
      </p>

      <TextInput
        label="Product Name"
        v-model="form.name"
        placeholder="e.g. Strawberry Shortcake"
      />

      <TextInput
        label="Description"
        v-model="form.description"
        placeholder="Product description..."
      />

      <div class="grid grid-cols-2 gap-4">
        <TextInput
          label="Price"
          v-model="form.price"
          placeholder="0.00"
          type="number"
          step="0.01"
          prefix="₱"
        />

        <Dropdown
          label="Category"
          v-model="form.category"
          :options="Categories"
          placeholder="Select..."
        />
      </div>
    </div>

    <template #footer>
      <div class="flex w-full gap-2 justify-end">
        <TextButton
          label="Cancel"
          class="bg-gray-400 hover:bg-gray-500 text-white"
          @click="emit('close')"
        />
        <TextButton
          :label="loading ? 'Updating...' : 'Update'"
          :disabled="loading"
          @click="handleSubmit"
        />
      </div>
    </template>
  </Modal>
</template>
