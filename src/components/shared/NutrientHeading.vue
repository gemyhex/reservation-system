<template>
  <div>
    <h1 class="font-bold">{{ heading }}</h1>
    <h2 class="font-bold d-flex justify-space-between align-center">
      <span>
        {{ contentTitle }}
      </span>
      <span>
          {{ content }}
      </span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "NutrientHeading",
  props: ['heading', 'contentTitle', 'content'],
}
</script>