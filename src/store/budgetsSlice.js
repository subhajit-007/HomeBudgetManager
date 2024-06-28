import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BudgetActionType } from './actionTypes';

const initialState = {
  budgetList: [],
};

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    SET_BUDGETS: (state, action) => {
      state.budgetList = action.payload;
    },
    ADD_BUDGET: (state, action) => {
      state.budgetList.push(action.payload);
      AsyncStorage.setItem('budgets', JSON.stringify(state.budgetList));
    },
    REMOVE_BUDGET: (state, action) => {
      state.budgetList = state.budgetList.filter(budget => budget.id !== action.payload);
      AsyncStorage.setItem('budgets', JSON.stringify(state.budgetList));
    },
  },
});

export const { SET_BUDGETS, ADD_BUDGET, REMOVE_BUDGET } = budgetsSlice.actions;

export const fetchBudgets = () => async dispatch => {
  const storedBudgets = await AsyncStorage.getItem('budgets');
  if (storedBudgets) {
    dispatch(SET_BUDGETS(JSON.parse(storedBudgets)));
  }
};

export default budgetsSlice.reducer;
