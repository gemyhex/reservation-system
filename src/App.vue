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
  data() {
    return {
      locale: localStorage.getItem('locale')
    }
  },
  watch: {
    locale: {
      handler(newLocale) {
        document.body.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
      },
      immediate: true,
    }
  },
  mounted() {
    this.$i18n.locale = localStorage.getItem('locale') || 'en'
  }
};
</script>
