import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import {RootContext, useStore} from '../Context';
import Profile from '../Pages/Profile';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const state = useStore();
  return (
    <RootContext.Provider value={state}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </RootContext.Provider>
  );
};

export default StackNavigator;
