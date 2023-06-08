import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface AdhaaarCardProps {
  handleClose: Function;
  handleSuccess: Function;
}

export default function AdhaaarCard({
  handleClose,
  handleSuccess,
}: AdhaaarCardProps) {
  return (
    <View style={styles.wrapperContainer}>
      <Text style={styles.text}>Capture Adhaar</Text>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
