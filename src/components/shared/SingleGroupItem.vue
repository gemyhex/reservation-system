<template>
  <div
      :style="{
            [$i18n.locale === 'en' ? 'paddingLeft' : 'paddingRight']: nutrient.indentations * 10 + 'px'
          }"
  >
    <div class="d-flex justify-space-between align-center">
      <p>
        <span class="font-bold">{{ useNameOptions(nutrient) }}</span>
        <span class="ms-2">{{
            useNumConverter(roundNumbers(nutrient.value.toFixed(1)))
          }}{{ nutrient.unit ? useNameOptions(nutrient.unit) : $t('units.gram') }}</span>
      </p>
      <p class="font-bold">{{ nutrientDailyValue(nutrient) }}</p>
    </div>
    <hr class="section-divider" v-if="index < nutrientsLength - 1"/>
  </div>
</template>

<script>
import { toRefs, computed } from "vue";
import { useNumConverter } from "@/utils/useNumConverter";
import { useNameOptions } from "@/utils/useNameView";

export default {
  name: "SingleGroupItem",
  props: {
    nutrient: { type: Object, required: true },
    label: { type: Object, required: true },
    section: { type: Object, required: true },
    index: { type: [Number, String], required: true },
    nutrientsLength: { type: [Number, String], required: true },
  },
  setup(props) {
    const { label } = toRefs(props);
    const locale = computed(() => {
      return window.$i18n?.locale || "en";
    });

    const nutrientDailyValue = (sNutrient) => {
      const dailyValue = label.value.daily_value[sNutrient.name];
      if (dailyValue !== undefined) {
        const roundedValue = Math.round(dailyValue);
        return locale.value === "ar"
            ? `${useNumConverter(roundedValue)}%`
            : `${roundedValue}%`;
      }
      return null;
    };

    const roundNumbers = (num) => (num === '0.0' ? 0 : num > 1 ? Math.round(num) : num);

    return {
      useNameOptions,
      useNumConverter,
      nutrientDailyValue,
      roundNumbers,
    };
  },
};
</script>


<style scoped>

</style>