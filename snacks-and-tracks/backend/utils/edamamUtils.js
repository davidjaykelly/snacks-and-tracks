const axios = require("axios");

const searchEdamam = async (searchText) => {

  try {
    const app_id = process.env.EDAMAM_APP_ID;
    const app_key = process.env.EDAMAM_APP_KEY;

    // const response = await axios.get(
    //   `https://api.edamam.com/api/recipes/v2/search?q=chicken&app_id=${app_id}&app_key=${app_key}&random=true`
    // );

    const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=any&beta=true&q=${searchText}&app_id=${app_id}&app_key=${app_key}&random=true`
    );

    const recipes = response.data.hits.map((i) => {
      const {
        label,
        image,
        source,
        url,
        yield,
        dietLabels,
        healthLabels,
        cautions,
        ingredientLines,
        ingredients,
        calories,
        totalTime,
        totalNutrients,
        totalDaily,
        totalWeight,
      } = i.recipe;

      return {
        title: label,
        image,
        source,
        sourceUrl: url,
        text: ingredientLines,
        ingredients,
        portion: yield,
        dietLabels,
        healthLabels,
        cautions,
        calories,
        totalTime,
        totalNutrients,
        totalDaily,
        totalWeight,
      };
    });

    const recipesNotFound = {
      message: `Sorry, we couldn't find any recipes with ${searchText}`,
    };
    if (!response.data.count) {
      return recipesNotFound;
    } else {
      return recipes;
    }
  } catch (error) {
    console.log(error);
    return { message: "Sorry, something went wrong! Please try again." };
  }
};

module.exports = { searchEdamam };
