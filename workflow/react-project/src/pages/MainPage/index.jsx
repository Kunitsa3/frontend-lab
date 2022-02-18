import { useState } from 'react';

import Glass from '@assets/img/GlassWithCocktail.jpg';
import Modal from '@components/common/Modal';

import './style.less';

const quotes = [
  `“I cook with wine, sometimes I even add it to the food.” — W.C. Fields`,
  `“I don’t have a drinking problem ‘cept when I can’t get a drink.” ― Tom Waits`,
  `“I drink to make other people more interesting.” — Ernest Hemingway`,
];

const MainPage = () => {
  const [isCocktailModalOpened, setCocktailModalOpened] = useState(false);
  const onGlassImageClick = () => {
    setCocktailModalOpened(!isCocktailModalOpened);
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
          <img src={Glass} className="glass-image" onClick={onGlassImageClick}></img>
          {/* <p className="image-subtitle">
            Press on glass to get a <br /> random cocktail
          </p> */}
        </div>
      </div>
      {isCocktailModalOpened && <Modal title="Random Cocktail" setModalClosed={onGlassImageClick} />}
    </div>
  );
};

export default MainPage;
