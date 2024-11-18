<template>
  <div>
    <h3>{{ $t('allItems') }}</h3>
    <div class="chip-container mb-2 border-sm pa-2 rounded">
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
import { useNameOptions } from "@/utils/useNameView";

export default {
  props: {
    nutrients: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const toggleNutrient = (nutrientId) => {
      const newSelected = props.selected.includes(nutrientId)
          ? props.selected.filter((id) => id !== nutrientId)
          : [...props.selected, nutrientId];

      emit("update", newSelected);
    };

    return {
      useNameOptions,
      toggleNutrient,
    };
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
  line-height: 100%;
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
