import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator';
import firebase from '@react-native-firebase/app';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDDi0xuGUwA5SlTKwGIsgoT8Y672-K3uJQ',
  authDomain: 'assign-22dc0.firebaseapp.com',
  projectId: 'assign-22dc0',
  storageBucket: 'assign-22dc0.appspot.com',
  messagingSenderId: '571177784311',
  appId: '1:571177784311:web:005d909cfb3c56299954f2',
  measurementId: 'G-SHSLBX9M29',
});

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
