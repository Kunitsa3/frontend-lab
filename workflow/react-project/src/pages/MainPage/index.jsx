import { useState } from 'react';
import { useDispatch } from 'react-redux';

import RandomCocktailModal from '@components/Modals/RandomCocktailModal';
import { changeModalKey } from '@store/appConfigurations/action';
import { fetchRandomCocktail, deleteRandomCocktailInformation } from '@store/randomCocktail/action';

import Glass from '@assets/img/GlassWithCocktail.jpg';

import './style.less';

const quotes = [
  `“I cook with wine, sometimes I even add it to the food.” — W.C. Fields`,
  `“I don’t have a drinking problem ‘cept when I can’t get a drink.” ― Tom Waits`,
  `“I drink to make other people more interesting.” — Ernest Hemingway`,
];

const MainPage = () => {
  const dispatch = useDispatch();
  const [isCocktailModalOpened, setCocktailModalOpened] = useState(false);

  const onGlassPictureClick = () => {
    dispatch(changeModalKey('Random Cocktail'));
    dispatch(fetchRandomCocktail());
    setCocktailModalOpened(!isCocktailModalOpened);
  };

  const setModalClosed = () => {
    setCocktailModalOpened(!isCocktailModalOpened);
    dispatch(changeModalKey(null));
    dispatch(deleteRandomCocktailInformation());
  };

  return (
    <div className="main-page-wrapper">
      <p className="main-page-title">Cocktail App</p>
      <div className="main-page-content-wrapper">
        <div className="quotes-wrapper">
          {quotes.map((quote, index) => (
            <p className={`quote quote-${index}`} key={index}>
              {quote}
            </p>
          ))}
        </div>
        <div className="glass-image-wrapper">
          <img src={Glass} className="glass-image" onClick={onGlassPictureClick}></img>
          {/* <p className="image-subtitle">
            Press on glass to get a <br /> random cocktail
          </p> */}
        </div>
      </div>
      {isCocktailModalOpened && <RandomCocktailModal setModalClosed={setModalClosed} />}
    </div>
  );
};

export default MainPage;
