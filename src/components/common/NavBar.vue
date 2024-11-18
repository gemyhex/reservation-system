<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <img src="@/assets/images/logo.svg" alt="">
      </div>

      <button @click="toggleLanguage" role="button" id="language-toggle" aria-label="language-toggle">
        <img src="@/assets/images/translate.svg" alt="">
      </button>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import i18n from '@/plugins/i18n'

export default {
  setup() {
    const locale = ref(localStorage.getItem("locale") || "en");

    const toggleLanguage = () => {
      locale.value = locale.value === "en" ? "ar" : "en";
      i18n.locale = locale.value;
      localStorage.setItem("locale", locale.value);
      document.body.setAttribute("dir", locale.value === "ar" ? "rtl" : "ltr");
    };

    onMounted(() => {
      i18n.locale = locale.value;
      document.body.setAttribute("dir", locale.value === "ar" ? "rtl" : "ltr");
    });

    return {
      locale,
      toggleLanguage,
    };
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