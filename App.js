/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

// lib
import FlashMessage from 'react-native-flash-message';

// navigations
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from './src/navigations/StackNavigation';
import NavigationService from './src/navigations/NavigationService';
import { GlobalContextProvide } from './src/ContextHooks/GlobalContextProvide';






const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GlobalContextProvide>
        <NavigationContainer
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}>
          <StackNavigation />

          <FlashMessage position="top" />

        </NavigationContainer>
      </GlobalContextProvide>
    </SafeAreaView>
  );
}


export default App;
