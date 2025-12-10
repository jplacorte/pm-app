<script setup lang="ts">
import { Button, IconButton } from "@pm-web/ui";
import TonberryIcon from "../Images/tonberry_christmas.png";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
</script>

<template>
  <div
    class="flex flex-row w-full h-fit bg-[#FFE8DB] items-center p-2 text-cyan-950 justify-between"
  >
    <Button class="border-none">
      <div class="flex items-center gap-2">
        <img :src="TonberryIcon" class="w-10 h-10" />
        <span class="text-[#5682B1] text-lg font-['Pacifico',cursive]"
          >Tonberry Cafe</span
        >
      </div>
    </Button>

    <IconButton :icon="faCircleUser" class="text-3xl text-[#5682B1]" />
  </div>
</template>
