<template>
  <div
      :style="{
            [$i18n.locale === 'en' ? 'paddingLeft' : 'paddingRight']: nutrient.indentations * 10 + 'px'
          }"
  >
    <div class="d-flex justify-space-between align-center">
      <p>
        <span class="font-bold">{{ useNameOptions(nutrient) }}</span>
        <span class="ms-2">{{ useNumConverter(roundNumbers(nutrient.value.toFixed(1))) }}{{ nutrient.unit ? useNameOptions(nutrient.unit) : $t('units.gram') }}</span>
      </p>
      <p class="font-bold">{{ nutrientDailyValue(nutrient) }}</p>
    </div>
    <hr class="section-divider" v-if="index < nutrientsLength - 1"/>
  </div>
</template>

<script>
import {useNumConverter} from "@/utils/useNumConverter";
import {useNameOptions} from "@/utils/useNameView";

export default {
  name: "SingleGroupItem",
  props: {
    nutrient: {
      type: Object,
      required: true
    },
    label: {
      type: Object,
      required: true
    },
    section: {
      type: Object,
      required: true
    },
    index: {
      type: [Number, String],
      required: true
    },
    nutrientsLength: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    useNameOptions,
    useNumConverter,
    nutrientDailyValue(sNutrient) {
      return this.label.daily_value[sNutrient.name] !== undefined ? this.$i18n.locale === 'ar' ? this.useNumConverter(Math.round(this.label.daily_value[sNutrient.name])) + '%' : Math.round(this.label.daily_value[sNutrient.name]) + '%' : null
    },
    roundNumbers(num) {
      if (num == 0) return 0
      return num > 1 ? Math.round(num) : num
    },
  }
}
</script>

<style scoped>

</style>