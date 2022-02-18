import { useSelector } from 'react-redux';
import './style.less';

const ModalContent = () => {
  const randomCocktailDetails = useSelector(state => state.appConfigurations.randomCocktail).drinks[0];
  const randomCocktail = Object.entries(randomCocktailDetails);
  const cocktailName = randomCocktailDetails.strDrink;
  const cocktailPicture = randomCocktailDetails.strDrinkThumb;
  const instructions = randomCocktailDetails.strInstructions;
  const ingredients = randomCocktail.filter(item => item[0].includes('strIngredient') && item[1]);
  const quantity = randomCocktail.filter(item => item[0].includes('strMeasure') && item[1]);

  return (
    <>
      <p className="cocktail-name">{cocktailName}</p>
      <div className="cocktail-picture-wrapper">
        <img src={cocktailPicture} className="cocktail-picture" />
      </div>
      <p className="recipe-title">Recipe</p>
      <div className="recipe-wrapper">
        <p>''</p>
        <p className="border">Ingredient</p>
        <p>Qnty</p>
        <p>''</p>
        <p>1</p>
        <p>Tequila</p>
        <p>1 1/2</p>
        <p>oz</p>
      </div>
      <p className="recipe-instructions">{instructions}</p>
    </>
  );
};

export default ModalContent;
