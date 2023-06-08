import React from 'react';
import {View} from 'react-native';
import Button from '../../Common/Button';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const Navigator = useNavigation();
  return (
    <View style={styles.container}>
      <Button text="Register" onPress={() => Navigator.navigate('Register')} />
      <View style={styles.spacer} />
      <Button
        text="View Profile"
        onPress={() => Navigator.navigate('Profile')}
      />
    </View>
  );
};

export default Home;
