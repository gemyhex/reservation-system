<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <img src="@/assets/images/logo.svg" alt="">
      </div>

      <button @click="toggleLanguage">
        <img src="@/assets/images/translate.svg" alt="">
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toggleLanguage() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ar" : "en";
      localStorage.setItem('locale', this.$i18n.locale)
      document.body.setAttribute('dir', this.$i18n.locale === 'ar' ? 'rtl' : 'ltr');
    },
  },
};
</script>

<style lang="scss">
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #f5f5f5;
  padding: 0 20px;

  img {
    height: 30px;
  }

  button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #000;
    cursor: pointer;
  }
}
</style>