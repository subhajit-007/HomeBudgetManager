import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import BudgetListScreen from '../screens/BudgetListScreen';
import {SCREEN_OPTIONS} from './NavConfig';
import {Provider} from 'react-redux';
import store from '../store/store';
import AddBudgetScreen from '../screens/AddBudgetScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={BudgetListScreen}
            options={SCREEN_OPTIONS}
          />
          <Stack.Screen
            name="AddBudget"
            component={AddBudgetScreen}
            options={SCREEN_OPTIONS}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MainNavigation;
