// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './navigation/navbar';

const App = () => {
  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
};

export default App;
