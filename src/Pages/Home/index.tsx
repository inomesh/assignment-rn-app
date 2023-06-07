import React from 'react';
import {View} from 'react-native';
import Button from '../../Common/Button';
import styles from './styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <Button text='Register' onPress={()=> {}} />
      <View style={styles.spacer} />
      <Button text='View Profile' onPress={()=> {}} />
    </View>
  );
};

export default Home;
