import { configureStore } from '@reduxjs/toolkit';
import budgetsReducer from './budgetsSlice';

const store = configureStore({
  reducer: {
    budgets: budgetsReducer,
  },
});

export default store;
