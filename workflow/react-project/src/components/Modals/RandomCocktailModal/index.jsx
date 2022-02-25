import { useSelector } from 'react-redux';

import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Table from './Table';
import Spinner from '@common/Spinner';
import Modal from '@common/Modal';

import { selectRandomCocktailDetails, selectRandomCocktailLoading } from '@store/randomCocktail/selectors';

import './style.less';

const RandomCocktailModal = ({ setModalClosed }) => {
  const randomCocktailLoadingStatus = useSelector(selectRandomCocktailLoading);
  const randomCocktailDetails = useSelector(selectRandomCocktailDetails);

  return (
    <Modal title="Random Cocktail" setModalClosed={setModalClosed}>
      <Spinner loading={randomCocktailLoadingStatus} />
      <div className="cocktail-name-wrapper">
        <p className="cocktail-name">{randomCocktailDetails.cocktailName}</p>
        <FontAwesomeIcon icon={faStar} className="cocktail-save-icon" />
      </div>

      <div className="cocktail-picture-wrapper">
        <img src={randomCocktailDetails.cocktailPicture} className="cocktail-picture" />
      </div>
      <p className="recipe-title">Recipe</p>
      <Table randomCocktailDetails={randomCocktailDetails} />
      <p className="recipe-instructions">{randomCocktailDetails.instructions}</p>
    </Modal>
  );
};

export default RandomCocktailModal;
