import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../../../components/common/Tooltip';

import './style.less';

const CocktailCard = ({ name, picture }) => {
  return (
    <div className="cocktail-card-wrapper">
      <div className="cocktail-card-photo-wrapper">
        <img className="cocktail-card-photo" src={picture} />
      </div>
      <p className="cocktail-card-name">{name}</p>
      <div className="d-flex">
        <Tooltip text="Contain Alcohol">
          <p className="cocktail-card-age">18+</p>
        </Tooltip>
        <FontAwesomeIcon icon={faMartiniGlassCitrus} className="cocktail-card-icon" />
      </div>
    </div>
  );
};

export default CocktailCard;
