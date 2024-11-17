<script>
export default {
  name: "NutrientHeading",
  props: ['heading', 'contentTitle', 'content'],
}
</script>

<template>
  <div>
    <h3 class="font-bolder">{{ heading }}</h3>
    <h2 class="font-bolder d-flex justify-space-between align-center">
      <span>
        {{ contentTitle }}
      </span>
      <span>
          {{ content }}
      </span>
    </h2>
  </div>
</template>

<style scoped>

</style>