<template>
  <div class="layout">
    <!-- Navbar -->
    <Navbar />

    <div class="layout-body">

      <!-- Content Area -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/NavBar.vue";

export default {
  components: {
    Navbar,
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
