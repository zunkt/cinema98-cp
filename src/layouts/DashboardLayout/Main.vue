<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";
import Sidebar from "@/components/Slidebar/Main.vue";
import Header from "@/components/Header/index.vue";
export default defineComponent({
  components: {
    Header,
    Sidebar,
  },
});
</script>
