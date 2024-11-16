<template>
  <div class="nutrition-label">
    <h1>{{ $t('nutritionFacts') }}</h1>
    <hr class="section-divider"/>
    <div class="servings">
      <p>

        {{
          $i18n.locale === 'ar'
              ? ConvertToArabicNumbers(label.amounts.number_of_servings)
              : label.amounts.number_of_servings
        }} {{ $t('servingsPerContainer') }}
      </p>
      <h2 class="font-bolder d-flex justify-space-between align-center">
      <span>
        {{ $t('servingSize') }}
      </span>
        <span>
          {{
            $i18n.locale === 'ar' ? ConvertToArabicNumbers(label.amounts.serving) : label.amounts.serving
          }}{{ $t('units.gram') }}
        </span>
      </h2>
    </div>

    <hr class="section-divider x5"/>

    <div class="calories">
      <h2 class="font-bolder">{{ $t('amountPerServing') }}</h2>
      <h1 class="font-bolder d-flex justify-space-between align-center">
      <span>
        {{ $t('calories') }}
      </span>
        <span>
          {{ $i18n.locale === 'ar' ? ConvertToArabicNumbers(roundedCalories) : roundedCalories }}{{ $t('units.gram') }}
        </span>
      </h1>
    </div>
    <hr class="section-divider x4"/>
    <h5 class="text-end">% {{ $t('dailyValue') }} *</h5>
    <hr class="section-divider"/>
    <div v-for="section in groupedNutrients" :key="section.key" class="section">
      <div
          v-for="(nutrient, index) in filteredNutrients(section.nutrients)"
          :key="nutrient.id"
          :style="{
            [$i18n.locale === 'en' ? 'paddingLeft' : 'paddingRight']: nutrient.indentations * 10 + 'px'
          }"
      >
        <div class="d-flex justify-space-between align-center">
          <p>
            <span class="font-bold">{{ displayName(nutrient) }}</span>
            <span class="ms-2">{{
                $i18n.locale === 'ar' ? ConvertToArabicNumbers(Math.round(nutrient.value)) : roundNumbers(nutrient.value.toFixed(1))
              }}{{ nutrient.unit ? displayName(nutrient.unit) : $t('units.gram') }}</span>
          </p>
          <h5 class="font-bold">{{ nutrientDailyValue(nutrient) }}</h5>
        </div>
        <hr class="section-divider" v-if="index < filteredNutrients(section.nutrients).length - 1"/>
      </div>
      <hr class="section-divider x2"/>
    </div>

    <div class="disclaimer">
      <p class="font-bold">*
        {{ $t('disclaimer', {quantity: $i18n.locale === 'ar' ? ConvertToArabicNumbers('2,000') : '2,000'}) }}</p>
    </div>
  </div>
</template>

<script>
export default {
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
    displayName(label) {
      return this.$i18n.locale === "ar" ? label.name_ar : label.name;
    },
    nutrientDailyValue(sNutrient) {
      return this.label.daily_value[sNutrient.name] !== undefined ? this.$i18n.locale === 'ar' ? this.ConvertToArabicNumbers(Math.round(this.label.daily_value[sNutrient.name])) + '%' : Math.round(this.label.daily_value[sNutrient.name]) + '%' : null
    },
    roundNumbers(num) {
      if (num == 0) return 0
      return num > 1 ? Math.round(num) : num
    },
    ConvertToArabicNumbers(num) {
      const arabicNumbers =
          "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
      return String(num).replace(/[0123456789]/g, d => {
        return arabicNumbers[d];
      });
    },
    filteredNutrients(nutrients) {
      if (Array.isArray(nutrients)) {
        return nutrients.filter(nutrient => this.displayName(nutrient) !== 'Calories' && this.displayName(nutrient) !== 'السعرات الحرارية');
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

.section-divider {
  border-top: 2px solid #000;
  margin: 5px 0;

  &.x2 {
    border-top: 4px solid #000;
  }

  &.x3 {
    border-top: 6px solid #000;
  }

  &.x4 {
    border-top: 8px solid #000;
  }

  &.x5 {
    border-top: 15px solid #000;
  }
}

.disclaimer {
  margin-top: 10px;
  font-size: 12px;
}
</style>
