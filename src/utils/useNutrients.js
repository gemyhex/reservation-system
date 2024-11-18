// useNutrients.js
export default function useNutrients(label, selectedNutrients) {
    const allNutrients = () => {
        return Object.values(label.serving).map((nutrient) => ({
            ...nutrient,
            selected: selectedNutrients.includes(nutrient.id), // Mark as selected if enabled
        }));
    };

    const groupedNutrients = () => {
        const groups = allNutrients().reduce((acc, nutrient) => {
            if (!acc[nutrient.section]) acc[nutrient.section] = [];
            acc[nutrient.section].push(nutrient);
            return acc;
        }, {});

        return Object.entries(groups).map(([key, nutrients]) => ({
            key,
            nutrients: nutrients.sort((a, b) => a.order - b.order),
        }));
    };

    return { groupedNutrients, allNutrients };
}
