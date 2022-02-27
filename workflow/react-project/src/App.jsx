import Header from '@components/Header';
import MainPage from '@pages/MainPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <Header />
    <MainPage />
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
  </>
);

export default App;
