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
import {computed, toRefs} from "vue";
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
  setup(props) {
    const {label, selectedNutrients} = toRefs(props);

    const enabledNutrients = computed(() =>
        Object.values(label.value.serving).filter((nutrient) =>
            selectedNutrients.value.includes(nutrient.id)
        )
    );

    const groupedNutrients = computed(() => {
      const groups = {};
      enabledNutrients.value.forEach((nutrient) => {
        if (!groups[nutrient.section]) groups[nutrient.section] = [];
        groups[nutrient.section].push(nutrient);
      });
      return Object.entries(groups).map(([key, nutrients]) => ({
        key,
        nutrients: nutrients.sort((a, b) => a.order - b.order),
      }));
    });

    const roundedCalories = computed(() =>
        Math.round(label.value.serving.Calories.value)
    );

    const filteredNutrients = (nutrients) =>
        Array.isArray(nutrients)
            ? nutrients.filter((nutrient) => nutrient.name !== "Calories")
            : [];

    return {
      useNumConverter,
      enabledNutrients,
      groupedNutrients,
      roundedCalories,
      filteredNutrients,
    };
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

.servings {
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
