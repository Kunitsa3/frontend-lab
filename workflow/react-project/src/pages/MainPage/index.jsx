import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeModalKey, deleteRandomCocktailInformation } from '../../store';
import fetchRandomCocktail from '../../store/randomCocktail/asyncThunks';
import ModalContent from '@components/common/Modal/ModalContent';

import Glass from '@assets/img/GlassWithCocktail.jpg';
import Modal from '@components/common/Modal';

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
      {isCocktailModalOpened && (
        <Modal title="Random Cocktail" setModalClosed={setModalClosed}>
          <ModalContent />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
