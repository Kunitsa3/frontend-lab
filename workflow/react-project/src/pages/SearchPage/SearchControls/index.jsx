import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchCocktail } from '@store/searchCocktail/action';
import './style.less';
import RadioButton from '../../../components/common/RadioButton';

const changeHandler = func => e => {
  func(e.target.value);
};

const SearchControls = () => {
  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState('drink');
  const [searchString, setSearchString] = useState('');

  const onSearchChange = changeHandler(setSearchString);

  const radioProps = [
    {
      label: 'By drink name',
      value: 'drink',
      onChange: changeHandler(setSearchParameter),
      checked: 'drink' === searchParameter,
    },
    {
      label: 'By ingredient name',
      value: 'ingredient',
      onChange: changeHandler(setSearchParameter),
      checked: 'ingredient' === searchParameter,
    },
  ];

  const onSearchIconClick = () => {
    dispatch(fetchCocktail({ searchParameter: searchParameter === 'drink' ? 's' : 'i', searchString }));
  };

  const onKeyPress = event => {
    event.code === 'Enter' && onSearchIconClick();
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
        {radioProps.map(({ value, ...radioProps }) => (
          <RadioButton key={value} value={value} {...radioProps} />
        ))}
      </div>
    </>
  );
};

export default SearchControls;
