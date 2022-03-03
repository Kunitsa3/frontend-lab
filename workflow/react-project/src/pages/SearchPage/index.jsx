import { useSelector } from 'react-redux';

import CocktailsCardsList from './CocktailsCardsList';
import SearchControls from './SearchControls';
import Spinner from '@common/Spinner';

import { selectSearchCocktailLoading } from '@store/searchCocktail/selectors';
import './style.less';

const SearchPage = () => {
  const randomCocktailLoadingStatus = useSelector(selectSearchCocktailLoading);

  return (
    <div className="search-page-wrapper">
      <SearchControls />
      <Spinner loading={randomCocktailLoadingStatus} />
      <CocktailsCardsList />
    </div>
  );
};

export default SearchPage;
