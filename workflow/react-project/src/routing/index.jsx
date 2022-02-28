import MainPage from '@pages/MainPage';
import SearchPage from '@pages/SearchPage';

export const routes = [
  {
    path: '/mainPage',
    element: <MainPage />,
    key: '1',
  },
  {
    path: '/search',
    element: <SearchPage />,
    key: '2',
  },
  {
    path: '/*',
    element: <MainPage />,
    key: '3',
  },
];
