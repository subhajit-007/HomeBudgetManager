import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import BudgetListScreen from '../screens/BudgetListScreen';
import {SCREEN_OPTIONS} from './NavConfig';
import {Provider} from 'react-redux';
import store from '../store/store';
import AddBudgetScreen from '../screens/AddBudgetScreen';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

// Theme for react-native-paper
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const MainNavigation = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
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
      </PaperProvider>
    </Provider>
  );
};

export default MainNavigation;
