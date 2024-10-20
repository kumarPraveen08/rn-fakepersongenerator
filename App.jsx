import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import SavedScreen from './src/screens/SavedScreen';
import HomeScreen from './src/screens/HomeScreen';
import useSettingsStorage from './src/states/useSettingsStorage';
import {ModalProvider} from './src/providers/ModalProvider';
import useTheme from './src/hooks/useTheme';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import GenerateBulkScreen from './src/screens/GenerateBulkScreen';
import GenerateProfileScreen from './src/screens/GenerateProfileScreen';
import DownloadsScreen from './src/screens/DownloadsScreen';
import {MenuProvider} from 'react-native-popup-menu';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Warning: A props object containing a "key" prop is being spread into JSX',
]);

const Stack = createStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const {isDarkMode} = useSettingsStorage();

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      theme.background,
      isDarkMode ? 'light' : 'dark',
    );
  }, [isDarkMode]);

  return (
    <MenuProvider>
      <ModalProvider>
        <StatusBar
          backgroundColor={theme.background}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          animated={true}
        />
        <Stack.Navigator
          initialRouteName={'HomeScreen'}
          screenOptions={{headerShown: false, animation: 'fade'}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SavedScreen" component={SavedScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="DownloadsScreen" component={DownloadsScreen} />
          <Stack.Screen
            name="GenerateBulkScreen"
            component={GenerateBulkScreen}
          />
          <Stack.Screen
            name="GenerateProfileScreen"
            component={GenerateProfileScreen}
          />
        </Stack.Navigator>
      </ModalProvider>
    </MenuProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
