// import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
const persistor = persistStore(store);
import { injectStore } from './utils/authorizeAxios.js';
injectStore(store);
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter
    basename="/"
    future={{
      v7_startTransition: true
    }}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            confirmationButtonProps: {
              color: 'secondary',
              variant: 'outlined'
            },
            cancellationButtonProps: {
              color: 'inherit',
              variant: 'outlined'
            }
          }}
        >
          <CssBaseline />
          <ScrollToTop />
          <App />
          <ToastContainer position="bottom-left" theme="colored" autoClose={2000} />
        </ConfirmProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
