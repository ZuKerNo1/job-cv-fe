import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';
import { refreshTokenAPI } from '../apis';
import { logOutUserAPI } from '../redux/User/userSlice';

let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

let authorizeAxiosIntance = axios.create();
authorizeAxiosIntance.defaults.timeout = 1000 * 60 * 10;
authorizeAxiosIntance.defaults.withCredentials = true;

authorizeAxiosIntance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null;

authorizeAxiosIntance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    interceptorLoadingElements(false);

    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logOutUserAPI(false));
    }
    const originalRequests = error.config;
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken;
          })
          .catch(() => {
            axiosReduxStore.dispatch(logOutUserAPI(false));
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        return authorizeAxiosIntance(originalRequests);
      });
    }

    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    if (error.response?.status !== 410 && error.response?.status !== 500) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);
export default authorizeAxiosIntance;
