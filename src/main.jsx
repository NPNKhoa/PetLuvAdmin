import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store, { persister } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingPage } from './pages/index.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

dayjs.extend(utc);
dayjs.extend(timezone);

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
    <ToastContainer
      position='bottom-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </>
);
