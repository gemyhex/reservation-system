<template>
  <div>
    <h3>{{ $t('allItems') }}</h3>
    <div class="chip-container">
      <div v-for="nutrient in nutrients" :key="nutrient.id" :class="{
          'chip selected': selected.includes(nutrient.id),
          'chip': !selected.includes(nutrient.id)
        }"
           @click="toggleNutrient(nutrient.id)">
        {{ useNameOptions(nutrient) }}
      </div>
    </div>
  </div>
</template>

<script>
import {useNameOptions} from "@/utils/useNameView";

export default {
  props: {
    nutrients: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    }
  },
  methods: {
    useNameOptions,
    toggleNutrient(nutrientId) {
      const newSelected = this.selected.includes(nutrientId)
          ? this.selected.filter((id) => id !== nutrientId)
          : [...this.selected, nutrientId];
      this.$emit("update", newSelected);
    },
  },
};
</script>
<style scoped>
.chip-container {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.chip {
  background-color: #e8e8e9;
  color: #1f2937;
  padding: 8px 16px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.chip.selected {
  background-color: #0f393a;
  color: white;
}

.chip:hover {
  opacity: 0.8;
}
</style>
