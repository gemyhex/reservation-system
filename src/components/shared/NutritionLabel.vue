<template>
  <div class="nutrition-label">
    <h1>{{ $t('nutritionFacts') }}</h1>
    <hr class="section-divider"/>
    <NutrientHeading
        class="servings"
        :heading="useNumConverter(label.amounts.number_of_servings) + ' ' + $t('servingsPerContainer')"
        :contentTitle="$t('servingSize')"
        :content="useNumConverter(label.amounts.serving) + $t('units.gram')"></NutrientHeading>
    <hr class="section-divider x5"/>
    <NutrientHeading
        class="calories"
        :heading="$t('amountPerServing')"
        :contentTitle="$t('calories')"
        :content="useNumConverter(roundedCalories) + $t('units.gram')"
    ></NutrientHeading>
    <hr class="section-divider x4"/>
    <p class="text-end font-bold">% {{ $t('dailyValue') }} *</p>
    <hr class="section-divider"/>
    <div v-for="section in groupedNutrients" :key="section.key" class="section">
      <SingleGroupItem
          v-for="(nutrient, index) in filteredNutrients(section.nutrients)"
          :key="nutrient.id"
          :nutrientsLength="filteredNutrients(section.nutrients).length"
          :index="index"
          :label="label"
          :section="section"
          :nutrient="nutrient"
      ></SingleGroupItem>
      <hr class="section-divider x2"/>
    </div>
    <div class="disclaimer">
      <p class="font-bold">* {{ $t('disclaimer', {quantity: useNumConverter('2,000')}) }}</p>
    </div>
  </div>
</template>

<script>
import SingleGroupItem from "@/components/shared/SingleGroupItem.vue";
import {useNumConverter} from "@/utils/useNumConverter";
import NutrientHeading from "@/components/shared/NutrientHeading.vue";

export default {
  components: {NutrientHeading, SingleGroupItem},
  props: {
    label: {
      type: Object,
      required: true,
    },
    selectedNutrients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    enabledNutrients() {
      return Object.values(this.label.serving).filter((nutrient) =>
          this.selectedNutrients.includes(nutrient.id)
      );
    },
    groupedNutrients() {
      const groups = {};
      this.enabledNutrients.forEach((nutrient) => {
        if (!groups[nutrient.section]) groups[nutrient.section] = [];
        groups[nutrient.section].push(nutrient);
      });
      return Object.entries(groups).map(([key, nutrients]) => ({
        key,
        nutrients: nutrients.sort((a, b) => a.order - b.order),
      }));
    },
    roundedCalories() {
      return Math.round(this.label.serving.Calories.value);
    },
  },
  methods: {
    useNumConverter,
    filteredNutrients(nutrients) {
      if (Array.isArray(nutrients)) {
        return nutrients.filter(nutrient => nutrient.name !== 'Calories');
      }
      return [];
    },
  },
};
</script>

<style lang="scss">
.nutrition-label {
  max-width: 350px;
  border: 1px solid #000;
  padding: 10px;
  background: #FFF;
}

.calories {
  h1 {
    font-size: x-large;
    font-weight: 700;
  }
}

.servings{
  h1 {
    font-size: medium;
    font-weight: 500;
  }
}

.disclaimer {
  margin-top: 10px;
  font-size: 12px;
}
</style>
