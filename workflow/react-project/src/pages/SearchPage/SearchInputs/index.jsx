import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchCocktail } from '@store/searchCocktail/action';

import './style.less';

const SearchInputs = () => {
  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState('s');
  const [searchString, setSearchString] = useState('');

  const onSearchChange = e => {
    setSearchString(e.target.value);
  };

  const onSearchIconClick = () => {
    dispatch(fetchCocktail({ searchParameter, searchString }));
  };

  const onKeyPress = event => {
    if (event.code === 'Enter') {
      onSearchIconClick();
    }
  };

  return (
    <>
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          value={searchString}
          onChange={onSearchChange}
          onKeyPress={onKeyPress}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" onClick={onSearchIconClick} />
      </div>
      <div className="radio-inputs-wrapper">
        <p className="radio-input-text">
          <input
            type="radio"
            className="input-radio"
            name="parameter"
            value="drink"
            id="by-drink"
            onClick={() => setSearchParameter('s')}
          />
          <label htmlFor="by-drink"> By drink name</label>
        </p>
        <p className="radio-input-text">
          <input
            type="radio"
            className="input-radio"
            name="parameter"
            value="ingredient"
            id="by-ingredient"
            onClick={() => setSearchParameter('i')}
          />
          <label htmlFor="by-ingredient">By ingredient name</label>
        </p>
      </div>
    </>
  );
};

export default SearchInputs;
