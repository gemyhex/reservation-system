<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script>
import Layout from "@/layouts/defaultLayout.vue";

export default {
  components: {
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
      deep: true,
    }
  },
  mounted() {
    this.$i18n.locale = localStorage.getItem('locale') || 'en'
  }
};
</script>
