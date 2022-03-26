import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './repos';

const store = configureStore({
  reducer: {
    repos: reposReducer,
  },
});

export default store;
