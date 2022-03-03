import { useSelector } from 'react-redux';
import { selectSearchCocktailDetails } from '@store/searchCocktail/selectors';

import CocktailCard from '../CocktailCard';

import './style.less';

const CocktailsCardsList = () => {
  const cocktailsDetails = useSelector(selectSearchCocktailDetails);

  return (
    <div className="cocktails-cards-lest-wrapper">
      {cocktailsDetails?.map(({ strDrink, strDrinkThumb, idDrink }) => (
        <CocktailCard name={strDrink} picture={strDrinkThumb} key={idDrink} />
      ))}
    </div>
  );
};

export default CocktailsCardsList;
