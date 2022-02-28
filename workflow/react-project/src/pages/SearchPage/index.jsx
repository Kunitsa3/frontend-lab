import { useSelector } from 'react-redux';
import { selectSearchCocktailLoading } from '@store/searchCocktail/selectors';

import CocktailsCardsList from './CocktailsCardsList';
import SearchInputs from './SearchInputs';
import Spinner from '@common/Spinner';

import './style.less';

const SearchPage = () => {
  const randomCocktailLoadingStatus = useSelector(selectSearchCocktailLoading);
  return (
    <div className="search-page-wrapper">
      <SearchInputs />
      {selectSearchCocktailLoading ? <Spinner loading={randomCocktailLoadingStatus} /> : <CocktailsCardsList />}
    </div>
  );
};

export default SearchPage;
