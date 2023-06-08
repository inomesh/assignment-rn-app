import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RootContext} from '../../Context';
import Button from '../../Common/Button';
import {useNavigation} from '@react-navigation/native';
import UserPlaceholderImage from '../../Assets/Images/user_placeholder.jpg';

function Profile() {
  const state = React.useContext(RootContext);
  const Navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={
            Boolean(state.values.image)
              ? {uri: state.values.image}
              : UserPlaceholderImage
          }
        />
        <Text style={styles.text}>User</Text>
        {!Boolean(state.values.image) && (
          <Button
            text="Edit Profile"
            onPress={() => Navigator.navigate('Register')}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  imageWrapper: {
    padding: 20,
    gap: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;
