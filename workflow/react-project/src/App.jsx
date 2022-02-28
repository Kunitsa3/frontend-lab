import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/Header';
import { routes } from './routing';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <ToastContainer
        position="top-right"
        theme="colored"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {routes.map(route => (
          <Route {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
