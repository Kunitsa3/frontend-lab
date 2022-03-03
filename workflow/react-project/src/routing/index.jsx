import MainPage from '@pages/MainPage';
import SearchPage from '@pages/SearchPage';

export const paths = {
  search: '/search',
  home: '/',
  404: '/*',
};

export const routes = [
  {
    path: paths.home,
    element: <MainPage />,
    key: '1',
  },
  {
    path: paths.search,
    element: <SearchPage />,
    key: '2',
  },
  {
    path: paths[404],
    element: <MainPage />,
    key: '3',
  },
];
