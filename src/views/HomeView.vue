<template>
  <div class="grid-container">
    <div class="nutrition-label-container">
      <NutritionLabel
          :label="label"
          :selected-nutrients="selectedNutrients"
          @update-selected-nutrients="updateSelectedNutrients"
      />
    </div>

    <div class="nutrient-toggle-container">
      <NutrientToggle
          :nutrients="allNutrients"
          :selected="selectedNutrients"
          @update="updateSelectedNutrients"
      />
    </div>
  </div>
</template>

<script>
import NutritionLabel from "@/components/shared/NutritionLabel.vue";
import NutrientToggle from "@/components/shared/NutrientToggle.vue";
import mockData from "@/data/labels.json";

export default {
  components: {
    NutritionLabel,
    NutrientToggle,
  },
  data() {
    const allNutrients = Object.values(mockData.label.serving).map((nutrient) => ({
      id: nutrient.id,
      name: nutrient.name,
      name_ar: nutrient.name_ar,
      enabled: nutrient.enabled === 1,
    }));

    return {
      label: mockData.label,
      allNutrients,
      selectedNutrients: allNutrients.filter((nutrient) => nutrient.enabled).map((n) => n.id),
    };
  },
  methods: {
    updateSelectedNutrients(newSelected) {
      this.selectedNutrients = newSelected;
    },
  },
};
</script>
<style>
.nutrition-label-container,
.nutrient-toggle-container {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>