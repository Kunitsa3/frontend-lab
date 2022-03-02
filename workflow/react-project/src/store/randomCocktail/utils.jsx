export const normalizeRandomCocktailData = data => {
  const normalizeData = data?.drinks?.[0] || {};
  const cocktailName = normalizeData?.strDrink;
  const cocktailPicture = normalizeData?.strDrinkThumb;
  const instructions = normalizeData?.strInstructions;

  const ingredientsDetails = Object.entries(normalizeData || {}).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      const quantityKey = key.replace('strIngredient', 'strMeasure');
      const measure = normalizeData[quantityKey];

      return [
        ...acc,
        {
          ingredient: value,
          quantity: measure
            ?.match(/[\s\d/\/]+/)
            ?.join('')
            .trim(),
          unit: measure?.match(/[a-z ]/gi)?.join(''),
        },
      ];
    }

    return acc;
  }, []);

  return { cocktailName, cocktailPicture, instructions, ingredientsDetails };
};
