<template>
  <div class="layout">
    <!-- Navbar -->
    <Navbar :is-arabic="isArabic" @toggle-language="toggleLanguage" />

    <div class="layout-body">

      <!-- Content Area -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/global/NavBar.vue";

export default {
  components: {
    Navbar,
  },
  props: {
    isArabic: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-language"],
  methods: {
    toggleLanguage() {
      this.$emit("toggle-language");
    },
  },
};
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-body {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .layout-body {
    flex-direction: column;
  }
}

</style>
