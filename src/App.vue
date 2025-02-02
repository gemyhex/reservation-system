<template>
  <Layout>
    <HomeView></HomeView>
  </Layout>
</template>

<script>
import Layout from "@/layouts/defaultLayout.vue";
import HomeView from "@/views/HomeView.vue";

export default {
  components: {
    HomeView,
    Layout,
  },
};
</script>
