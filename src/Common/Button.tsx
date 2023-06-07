import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({text, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

/**
 * Component Style
 */

interface IStyle {
  container: ViewStyle;
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create<IStyle>({
  container: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
