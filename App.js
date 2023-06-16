import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./components/LoginScreen";
import HomeScreen from './components/HomeScreen';
import FavoritesScreen from './components/FavoritesScreen';
import UploadScreen from './components/UploadScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="Added" component={FavoritesScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Upload" component={LocationAutocompleteComponent} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}