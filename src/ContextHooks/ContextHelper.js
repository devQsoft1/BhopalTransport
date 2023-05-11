//---------- imports

// react
import React, {useEffect, useState, createContext, useContext} from 'react';

//---------- context

import {AppContext} from './GlobalContextProvide';

const ContextHelper = () => {
  //---------- state, veriable, context and hooks
  const {
    loading,
    isDarkTheme,
    theme,
    appStateObject,
    appStateArray,
    currentUser,
    currentLocation,
    keyboardStatus,

    setLoading,
    postData,
    changeTheme,
    storeDataInAppState,
    removeDataFromAppState,
    removeAllDataFromAppState,
    storeDataInAsyncStorage,
    getDataFromAsyncStorage,
    removeDataFromAsyncStorage,
    setCurrentUser,
  } = useContext(AppContext);

  //---------- main app / component

  return {
    loading,
    isDarkTheme,
    theme,
    appStateObject,
    appStateArray,
    currentUser,
    currentLocation,
    keyboardStatus,

    setLoading,
    postData,
    changeTheme,
    storeDataInAppState,
    removeDataFromAppState,
    removeAllDataFromAppState,
    storeDataInAsyncStorage,
    getDataFromAsyncStorage,
    removeDataFromAsyncStorage,
    setCurrentUser,
  };
};

//---------- export component

export default ContextHelper;
