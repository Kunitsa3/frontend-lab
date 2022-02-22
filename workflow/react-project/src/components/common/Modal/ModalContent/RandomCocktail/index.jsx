import { useSelector } from 'react-redux';

import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.less';

const RandomCocktail = () => {
  const randomCocktailStatus = useSelector(state => state.randomCocktail?.status);
  const randomCocktailDetails = useSelector(state => state.randomCocktail?.details)?.drinks?.[0];
  const randomCocktail = Object.entries(randomCocktailDetails || {});
  const cocktailName = randomCocktailDetails?.strDrink;
  const cocktailPicture = randomCocktailDetails?.strDrinkThumb;
  const instructions = randomCocktailDetails?.strInstructions;
  const ingredients = randomCocktail?.filter(item => item[0].includes('strIngredient') && item[1]);
  const quantity = randomCocktail?.filter(item => item[0].includes('strMeasure') && item[1]);

  return randomCocktailStatus !== 'fulfilled' ? (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
    </div>
  ) : (
    <>
      <div className="cocktail-name-wrapper">
        <p className="cocktail-name">{cocktailName}</p>
        <FontAwesomeIcon icon={faStar} className="cocktail-save-icon" />
      </div>

      <div className="cocktail-picture-wrapper">
        <img src={cocktailPicture} className="cocktail-picture" />
      </div>
      <p className="recipe-title">Recipe</p>
      <div>
        <div className="recipe-wrapper">
          <p className="cell-border"></p>
          <p className="cell-border">Ingredient</p>
          <p className="cell-border">Qnty</p>
          <p className="cell-border"></p>
        </div>
        {ingredients.map((ingredient, index) => {
          return (
            <div className="recipe-wrapper" key={index}>
              <p className="cell-border">{index + 1}</p>
              <p className="cell-border justify-content-start">{ingredient?.[1]}</p>
              <p className="cell-border">{quantity?.[index]?.[1].match(/[\s\d/\/]+/)}</p>
              <p className="cell-border">{quantity?.[index]?.[1].match(/[a-z ]/gi)}</p>
            </div>
          );
        })}
      </div>
      <p className="recipe-instructions">{instructions}</p>
    </>
  );
};

export default RandomCocktail;
